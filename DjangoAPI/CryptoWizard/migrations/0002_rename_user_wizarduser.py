# Generated by Django 4.0.4 on 2022-05-13 20:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('CryptoWizard', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='User',
            new_name='WizardUser',
        ),
    ]