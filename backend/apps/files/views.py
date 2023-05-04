from django.http import HttpResponseBadRequest, HttpResponse, JsonResponse
import os
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import File
from .serializers import FileSerializer
from .services import save_file
from rest_framework.response import Response
from rest_framework.mixins import ListModelMixin, DestroyModelMixin
from rest_framework.viewsets import GenericViewSet


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def upload(request):
    content_range = request.headers.get('Content-Range')
    if not content_range:
        return HttpResponseBadRequest('Content-Range header is missing')

    range_parts = content_range.split('/')
    if len(range_parts) != 2:
        return HttpResponseBadRequest('Invalid Content-Range header')

    content_range_size = int(range_parts[1])
    content_range_start, content_range_end = map(
        int, range_parts[0].split('-')
    )

    file_data = request.FILES.get('file').read()
    file_name = request.POST.get('file_name')

    file_path = os.path.join(settings.TEMP_ROOT, f'{file_name}')

    if content_range_size > settings.MAX_FILE_SIZE:
        if os.path.isfile(file_path):
            os.remove(file_path)
        return JsonResponse({'type': 'file_too_large'}, status=400)

    if content_range_start == 0:
        file_dir = os.path.dirname(file_path)
        if not os.path.exists(file_dir):
            os.makedirs(file_dir)
        file_handle = open(file_path, 'wb')
    else:
        file_handle = open(file_path, 'ab')

    file_handle.seek(content_range_start)

    file_handle.write(file_data)
    file_size = file_handle.tell()
    file_handle.close()

    if content_range_size < file_size > settings.MAX_FILE_SIZE:
        os.remove(file_path)
        return JsonResponse({'type': 'file_too_large'}, status=400)

    if file_size == content_range_size:
        user = request.user
        file = save_file(file_name, content_range_size, user)
        file.set_active()
        serializer = FileSerializer(file)
        return Response(serializer.data)

    response = HttpResponse(status=204)
    return response


class ListDeleteFileViewSet(ListModelMixin, DestroyModelMixin, GenericViewSet):
    serializer_class = FileSerializer
    queryset = File.objects.all()

    def get_queryset(self):
        return super().get_queryset().filter(
            user=self.request.user, active=True
        )
