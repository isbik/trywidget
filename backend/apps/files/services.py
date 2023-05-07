from django.conf import settings
from shared.errors import invalid_data_error, too_large_file_error
import subprocess


def get_content_range_parts(header: str):
    range_parts = header.split('/')

    total = int(range_parts[1])
    start, end = map(int, range_parts[0].split('-'))

    return (start, end, total)


def get_header_content_range_error(header: str):
    if not header:
        return invalid_data_error
    range_parts = header.split('/')

    if len(range_parts) != 2:
        return invalid_data_error
    total_size = int(range_parts[1])

    start, end = map(int, range_parts[0].split('-'))

    if start > end or total_size < end:
        return invalid_data_error
    if total_size > settings.MAX_FILE_SIZE:
        return too_large_file_error


def generate_preview(video_path: str, image_path: str):
    subprocess.call(
        ['ffmpeg', '-i', video_path, '-ss',
         '00:00:01.000', '-vframes', '1', image_path]
    )
