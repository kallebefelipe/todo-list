from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q
from rest_framework import mixins
from rest_framework import viewsets
from rest_framework.decorators import detail_route
from rest_framework.response import Response

from . import models
from . import serializers


class TodoViewSet(LoginRequiredMixin, viewsets.ModelViewSet):
    queryset = models.Todo.objects.all()
    serializer_class = serializers.TodoSerializer

    def get_queryset(self):
        if not self.request.user.is_superuser:
            return models.Todo.objects.filter(
                Q(user=self.request.user.id) |
                Q(tasks__user__id=self.request.user.id)
            )
        return self.queryset.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    # @detail_route(methods=['get'])
    # def tasks(self, request, pk=None):
    #     try:
    #         models.Todo.objects.get(pk=pk, user=self.request.user)
    #     except models.Todo.DoesNotExist:
    #         tasks = models.Task.objects.filter(
    #             user__id=self.request.user.id,
    #             todo_id=pk
    #         )
    #     else:
    #         tasks = models.Task.objects.filter(todo_id=pk)

    #     serializer = serializers.TaskSerializer(tasks, many=True)
    #     return Response(serializer.data)


class TaskViewSet(
        LoginRequiredMixin, mixins.CreateModelMixin, mixins.RetrieveModelMixin,
        mixins.UpdateModelMixin, mixins.DestroyModelMixin,
        viewsets.GenericViewSet):
    queryset = models.Task.objects.all()
    serializer_class = serializers.TaskSerializer

    def get_queryset(self):
        if not self.request.user.is_superuser:
            return models.Task.objects.filter(
                Q(todo__user__id=self.request.user.id) |
                Q(user=self.request.user))
        return self.queryset.all()
