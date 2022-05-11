# Development Setup

## Backend API (Django)

Create virtual environment in repo (make sure you have python installed):
```bash
python -m venv venv
```

Activate venv:
```bash
venv\Scripts\activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

To create database tables
```bash
cd DjangoAPI
python manage.py makemigrations CryptoWizard
```

To migrate the changes form model to database 
```bash
python manage.py migrate CryptoWizard
```

To run the API:
```bash
python manage.py runserver
```

To access the server: 
```bash
localhost:8000
```


## Frontend (React)

WIP

## Additional programs

To see the database install: [SQLiteStudio](https://sqlitestudio.pl/)