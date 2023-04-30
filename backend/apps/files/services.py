from .models import File


def save_file(file_name: str, size: int, user):
    file = File.objects.create(url=f'temp/{file_name}',
                               size=str(size / 1024**2),
                               user=user)
    file.save()
    return file
