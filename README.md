
# Video-Cloud Storage

Simple video cloud storage for personal purposes (without an email verification message, i decided so)


## Installation

1. Install dependencies backend
* ```poetry install```

2. Install dependencies frontend
* ```cd frontend```
* ```npm install```
## Run Locally (after installation)

1. Activate environment
```bash
poetry shell
```
2. Run backend server
```bash
python3 manage.py runserver 0.0.0.0:8000
```
or run via gunicorn
```bash
gunicorn --bind 0.0.0.0:8000 backend.wsgi
```
3. Move to frontend directory
```bash
cd frontend
```
4. Run frontend server
```bash
npm run dev -- --host 0.0.0.0
```
## Used Technologies
* Django Rest Framework
* React
* Celery
* Redis
## Screenshots

<img src='/scrnshot/p1.PNG' width=240><img src='/scrnshot/p2.PNG' width=240><img src='/scrnshot/p3.PNG' width=240>
<img src='/scrnshot/p4.png'>
<img src='/scrnshot/p5.png'>