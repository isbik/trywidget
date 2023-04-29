from django.http import HttpResponseBadRequest, HttpResponse, JsonResponse, HttpRequest
import os
from django.conf import settings

from .services import save_file
from apps.users.models import User


def upload(request):

    if request.method != 'POST':
        return HttpResponseBadRequest('Invalid request method')

    content_range = request.headers.get('Content-Range')
    if not content_range:
        return HttpResponseBadRequest('Content-Range header is missing')

    range_parts = content_range.split('/')
    if len(range_parts) != 2:
        return HttpResponseBadRequest('Invalid Content-Range header')

    content_range_size = int(range_parts[1])
    content_range_start, content_range_end = map(
        int, range_parts[0].split('-'))

    file_data = request.FILES.get('file').read()
    file_name = request.POST.get('file_name')

    file_path = os.path.join(settings.TEMP_ROOT, f'{file_name}')

    if content_range_start == 0:
        file_dir = os.path.dirname(file_path)
        if not os.path.exists(file_dir):
            os.makedirs(file_dir)
        file_handle = open(file_path, 'wb')
    else:
        file_handle = open(file_path, 'ab')

    file_handle.seek(content_range_start)

    file_handle.write(file_data)

    file_handle.close()

    if content_range_end == content_range_size - 1:
        # TODO  user id
        user = User.objects.get(pk=1)
        file = save_file(file_name, content_range_size, user)

        return JsonResponse({'id': file.pk,
                             'url': settings.API_URL + file.url,
                             'user': user.pk,
                             'size': file.size,
                             'created_at': file.created_at})

    response = HttpResponse(status=204)
    return response
