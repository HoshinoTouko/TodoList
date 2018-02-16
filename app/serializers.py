'''
@File: serializers.py
@Author: HoshinoTouko
@License: (C) Copyright 2014 - 2017, HoshinoTouko
@Contact: i@insky.jp
@Website: https://touko.moe/
@Create at: 2018/2/15 23:31
@Desc: 
'''
from .models import TodoList
from rest_framework import serializers


class TodoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoList
        fields = ('id', 'content', 'create', 'expire', 'status', 'priority')
