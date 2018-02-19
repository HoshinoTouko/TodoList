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
    url(r'^(?P<list_id>[0-9]+)/$', views.todo_list_detail),
    url('all/pri/', views.get_all_order_by_priority),
    url('all/exp/', views.get_all_order_by_expire),
    url('all/id/', views.get_all),
    url('add/', views.add),
]
