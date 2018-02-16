# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todolist',
            name='create',
            field=models.DateField(default=django.utils.timezone.now, blank=True),
        ),
        migrations.AlterField(
            model_name='todolist',
            name='expire',
            field=models.DateField(blank=True),
        ),
        migrations.AlterField(
            model_name='todolist',
            name='priority',
            field=models.BigIntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name='todolist',
            name='status',
            field=models.BigIntegerField(blank=True),
        ),
    ]
