# Generated by Django 4.2 on 2023-06-06 12:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('playground', '0002_registrationkey'),
    ]

    operations = [
        migrations.CreateModel(
            name='DataSource',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('description', models.CharField(max_length=30)),
                ('url', models.CharField(max_length=30)),
                ('key', models.TextField()),
            ],
        ),
    ]
