# Generated by Django 3.1.3 on 2022-12-26 01:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0016_remove_user_is_superuer'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='imgfile',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]