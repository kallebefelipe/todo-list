from rest_framework import viewsets
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.decorators import detail_route
from rest_framework.response import Response

from . import models
from . import serializers


class TodoViewSet(LoginRequiredMixin, viewsets.ModelViewSet):
    queryset = models.Todo.objects.all()
    serializer_class = serializers.TodoSerializer

    def get_queryset(self):
        if not self.request.user.is_superuser:
            return models.Todo.objects.filter(user=self.request.user)
        return self.queryset.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @detail_route(methods=['get'])
    def tasks(self, request, pk=None):
        tasks = models.Task.objects.filter(todo_id=pk)
        serializer = serializers.TaskSerializer(tasks, many=True)

        return Response(serializer.data)


class TaskViewSet(LoginRequiredMixin, viewsets.ModelViewSet):
    queryset = models.Task.objects.all()
    serializer_class = serializers.TaskSerializer
