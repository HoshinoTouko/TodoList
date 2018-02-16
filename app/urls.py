'''
@File: urls.py
@Author: HoshinoTouko
@License: (C) Copyright 2014 - 2017, HoshinoTouko
@Contact: i@insky.jp
@Website: https://touko.moe/
@Create at: 2018/2/15 21:49
@Desc: 
'''
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^(?P<id>[0-9]+)/$', views.todo_list_detail),
    url('all/', views.get_all),
    url('add/', views.add),
]
