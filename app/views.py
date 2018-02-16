import logging
from .models import TodoList
from .serializers import TodoListSerializer
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser


@csrf_exempt
def get_all(request):
    """
    Show data
    """
    todo_list = TodoList.objects.all()
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
def todo_list_detail(request, id):
    """
    Edit or delete.
    """
    try:
        todo_list = TodoList.objects.get(id=id)
    except TodoList.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = TodoListSerializer(todo_list)
        return JSONResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = TodoListSerializer(todo_list, data=data)
        if serializer.is_valid():
            try:
                data['content']
                serializer.save()
                return JSONResponse(serializer.data)
            except Exception as e:
                print(e)
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