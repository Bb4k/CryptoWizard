<<<<<<< HEAD
# Generated by Django 4.0.4 on 2022-05-14 15:03
=======
# Generated by Django 4.0.4 on 2022-05-14 14:04
>>>>>>> 8180da43651b12f7e001aec799974c69815eb516

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Plan',
            fields=[
                ('plan_id', models.AutoField(primary_key=True, serialize=False)),
                ('plan_name', models.CharField(max_length=8)),
                ('plan_price', models.CharField(max_length=10)),
                ('plan_img', models.URLField()),
                ('plan_benefits', models.CharField(max_length=1024)),
            ],
        ),
        migrations.CreateModel(
            name='Token',
            fields=[
                ('token_id', models.AutoField(primary_key=True, serialize=False)),
                ('token_name', models.CharField(blank=True, max_length=32, unique=True)),
                ('token_sym', models.CharField(blank=True, max_length=5, unique=True)),
                ('token_img', models.URLField(blank=True, max_length=128)),
                ('token_next_price', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='WizardUser',
            fields=[
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('user_email', models.EmailField(max_length=254, unique=True)),
                ('user_f_name', models.CharField(max_length=32)),
                ('user_l_name', models.CharField(max_length=32)),
                ('user_dob', models.DateField(blank=True)),
                ('user_last_access', models.DateTimeField(auto_now_add=True)),
                ('user_active', models.BooleanField(blank=True, default=False)),
                ('user_created', models.DateTimeField(auto_now_add=True)),
                ('user_updated', models.DateTimeField(auto_now=True)),
                ('user_plan', models.ForeignKey(blank=True, default=0, on_delete=django.db.models.deletion.DO_NOTHING, to='CryptoWizard.plan')),
            ],
        ),
        migrations.CreateModel(
            name='WizardUserTransactions',
            fields=[
                ('transaction_id', models.AutoField(primary_key=True, serialize=False)),
                ('transaction_value', models.FloatField()),
                ('transaction_deposit', models.BooleanField()),
                ('transaction_success', models.BooleanField()),
                ('transaction_timestamp', models.DateTimeField(auto_now_add=True)),
                ('transaction_user_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='CryptoWizard.wizarduser')),
            ],
        ),
        migrations.CreateModel(
            name='WizardUserInvestments',
            fields=[
                ('investment_id', models.AutoField(primary_key=True, serialize=False)),
                ('investment_sym', models.CharField(max_length=5)),
                ('investment_init_value', models.FloatField()),
                ('investment_cur_value', models.FloatField()),
                ('investment_user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='CryptoWizard.wizarduser')),
            ],
        ),
        migrations.CreateModel(
            name='WizardUserFollow',
            fields=[
                ('follow_id', models.AutoField(primary_key=True, serialize=False)),
                ('follow_token', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='CryptoWizard.token')),
                ('follow_user_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='CryptoWizard.wizarduser')),
            ],
        ),
        migrations.CreateModel(
            name='Price',
            fields=[
                ('price_id', models.AutoField(primary_key=True, serialize=False)),
                ('price_timestamp', models.DateField(max_length=128)),
                ('price_real', models.FloatField()),
                ('price_predicted', models.FloatField()),
                ('price_token_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='CryptoWizard.token')),
            ],
        ),
        migrations.CreateModel(
            name='Password',
            fields=[
                ('pw_id', models.AutoField(primary_key=True, serialize=False)),
                ('pw_encr_str', models.CharField(max_length=254)),
                ('pw_user_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='CryptoWizard.wizarduser')),
            ],
        ),
    ]
