release: cd DjangoAPI
release: python manage.py makemigrations CryptoWizard
release: python manage.py migrate CryptoWizard

web: gunicorn DjangoAPI.wsgi
