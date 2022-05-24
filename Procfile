release: python DjangoAPI/manage.py makemigrations CryptoWizard
release: python DjangoAPI/manage.py migrate CryptoWizard

web: gunicorn DjangoAPI/DjangoAPI.wsgi
