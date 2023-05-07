from uuid import uuid4
import os
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import File
from .serializers import FileSerializer
from .services import get_header_content_range_error, get_content_range_parts
from rest_framework.response import Response
from rest_framework.mixins import ListModelMixin, DestroyModelMixin
from rest_framework.viewsets import GenericViewSet


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def upload(request):
    header = request.headers.get('Content-Range')

    error = get_header_content_range_error(header)
    if error:
        return Response(error, status=400)

    range_start, range_start, total_size = get_content_range_parts(header)

    file_data = request.FILES.get('file').read()

    file_id = request.POST.get('file_id', uuid4())

    file_path = os.path.join(settings.TEMP_ROOT, f'{file_id}')

    if range_start == 0:
        file_dir = os.path.dirname(file_path)
        if not os.path.exists(file_dir):
            os.makedirs(file_dir)
        file_handle = open(file_path, 'wb')
    else:
        file_handle = open(file_path, 'ab')

    file_handle.seek(range_start)

    file_handle.write(file_data)
    file_size = file_handle.tell()
    file_handle.close()

    if file_size == total_size:
        name = request.POST.get('file_name', "")
        user = request.user

        file = File.objects.create(name=name,
                                   url=f'temp/{file_id}',
                                   size=str(total_size / 1024**2),
                                   user=user,
                                   )
        file.save()

        file.set_active()

        serializer = FileSerializer(file)
        return Response(serializer.data)

    return Response({"file_id": file_id})


class ListDeleteFileViewSet(ListModelMixin, DestroyModelMixin, GenericViewSet):
    serializer_class = FileSerializer
    queryset = File.objects.all()

    def get_queryset(self):
        return super().get_queryset().filter(
            user=self.request.user, active=True
        )
