# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_auto_20180216_2357'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todolist',
            name='create',
            field=models.DateField(default=django.utils.timezone.now, null=True),
        ),
        migrations.AlterField(
            model_name='todolist',
            name='expire',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='todolist',
            name='priority',
            field=models.BigIntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='todolist',
            name='status',
            field=models.BigIntegerField(null=True),
        ),
    ]
