import datetime
from .models import TodoList
from .serializers import TodoListSerializer
from django.http import HttpResponse
from django.http import QueryDict
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser


@csrf_exempt
def get_all(request):
    todo_list = TodoList.objects.all().order_by('id')
    serializer = TodoListSerializer(todo_list, many=True)
    return JSONResponse(serializer.data)

@csrf_exempt
def get_all_order_by_expire(request):
    def transDate(s):
        try:
            return datetime.datetime.strptime(s)
        except Exception as e:
            return 0
    todo_list = TodoList.objects.all().order_by('id')
    serializer = TodoListSerializer(todo_list, many=True)
    tmp_data = list(map(
        lambda x: dict(x.items()),
        list(serializer.data)
    ))
    # return HttpResponse(str(tmp_data))
    data_after_order = sorted(
        tmp_data,
        key=lambda x: transDate(x.get('expire'))
    )
    return JSONResponse(data_after_order)

@csrf_exempt
def get_all_order_by_priority(request):
    todo_list = TodoList.objects.order_by('-priority')
    serializer = TodoListSerializer(todo_list, many=True)
    return JSONResponse(serializer.data)


@csrf_exempt
def add(request):
    data = request.GET
    serializer = TodoListSerializer(data=data)
    if serializer.is_valid():
        try:
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        except Exception as e:
            return HttpResponse(str(e))
    return JSONResponse(serializer.errors, status=400)


@csrf_exempt
def todo_list_detail(request, list_id):
    """
    Edit or delete.
    """
    try:
        todo_list = TodoList.objects.get(id=list_id)
    except TodoList.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = TodoListSerializer(todo_list)
        return JSONResponse(serializer.data)

    elif request.method == 'PUT':
        data = QueryDict(request.body)
        serializer = TodoListSerializer(todo_list, data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data)
        return JSONResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        todo_list.delete()
        return HttpResponse(status=204)


class JSONResponse(HttpResponse):
    """
    Return json data
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)
