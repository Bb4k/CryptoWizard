release: python DjangoAPI/manage.py makemigrations DjangoAPI.CryptoWizard
release: python DjangoAPI/manage.py migrate DjangoAPI.CryptoWizard

web: gunicorn DjangoAPI.DjangoAPI.wsgi
