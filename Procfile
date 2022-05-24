release: cd DjangoAPI && python manage.py makemigrations CryptoWizard
release: cd DjangoAPI && python manage.py migrate CryptoWizard

web: gunicorn DjangoAPI.DjangoAPI.wsgi
