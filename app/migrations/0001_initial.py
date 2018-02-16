# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TodoList',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('content', models.TextField()),
                ('create', models.DateField(default=django.utils.timezone.now)),
                ('expire', models.DateField()),
                ('status', models.BigIntegerField()),
                ('priority', models.BigIntegerField()),
            ],
        ),
    ]
