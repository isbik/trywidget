<!-- TODO -->
- [] Model файла из полей будут id:string, active: boolean, url: string, size: string, created_at: date, user_id: string, (добавить индекс на active)
- [] Сохранять эти файлы пока в папку temp, не в static
- [] После загрузки сохранять файл в бд
- [] Пользователю возвращать id файла
- [] Добавить задачу в celery (каждые 2 часа), которая будет удалять все файлы, которые живут больше часу и они не active
- [] Когда пользователь загрузил видео, он его прикрепляет к виджету, в этом случае менять статус файла на активным и перемещать его в папку static 


<!-- Backlog -->
- [] При записи файла по частям доп-но добавлять расширение file.mp4.part, когда запись закончилась его убирать
- [] Добавить задачу в celery (каждый день в 4 часа), которая будет удалять все файлы у которых расширение part и они изменены более 10 минут назад