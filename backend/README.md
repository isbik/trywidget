<!-- Start -->
### run redis
in folder devops
```sh
sudo docker-compose -f docker-compose.dev.yml up 
```
### run celery 
in folder backend
```sh
celery -A config worker -l INFO
```
### run django
```sh
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```


<!-- TODO -->
- [] Добавить задачу в celery (каждые 2 часа), которая будет удалять все файлы, которые живут больше часу и они не active
- [] Когда пользователь загрузил видео, он его прикрепляет к виджету, в этом случае менять статус файла на активным и перемещать его в папку static 


<!-- Backlog -->
- [] При записи файла по частям доп-но добавлять расширение file.mp4.part, когда запись закончилась его убирать
- [] Добавить задачу в celery (каждый день в 4 часа), которая будет удалять все файлы у которых расширение part и они изменены более 10 минут назад
