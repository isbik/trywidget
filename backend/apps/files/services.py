from os import name
from django.conf import settings
from .models import File


def get_content_range_parts(header: str):
    range_parts = header.split('/')

    total = int(range_parts[1])
    start, end = map(int, range_parts[0].split('-'))

    return (start, end, total)


def get_header_content_range_error(header: str):
    if not header:
        return {"type": 'invalid_data'}

    range_parts = header.split('/')

    if len(range_parts) != 2:
        return {"type": 'invalid_data'}

    total_size = int(range_parts[1])

    start, end = map(int, range_parts[0].split('-'))

    if start > end or total_size < end:
        return {"type": 'invalid_data'}

    if total_size > settings.MAX_FILE_SIZE:
        return {"type": 'file_too_large'}


def save_file(name: str, file_name: str, size: int, user):
    file = File.objects.create(
        name=name,
        url=f'temp/{file_name}',
        size=str(size / 1024**2),
        user=user,
    )

    file.save()

    return file
