from django.db import models
import datetime

# Create your models here.


class TodoList(models.Model):
    content = models.TextField(null=False)
    create = models.DateField(
        default=datetime.datetime.now().strftime("%Y-%m-%d"),
        null=True
    )
    expire = models.DateField(
        default=(datetime.datetime.now() + datetime.timedelta(days=1)).strftime("%Y-%m-%d"),
        null=True
    )
    status = models.BigIntegerField(null=True, default=0)
    priority = models.BigIntegerField(null=True, default=0)
