from django.db import models
import datetime

# Create your models here.


class TodoList(models.Model):
    content = models.TextField(null=False)
    create = models.DateField(
        default=datetime.datetime.now().strftime("%Y-%m-%d"),
        null=True
    )
    expire = models.DateField(null=True)
    status = models.BigIntegerField(null=True)
    priority = models.BigIntegerField(null=True)
