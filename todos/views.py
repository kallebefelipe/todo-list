from todos.serializers import UserSerializer
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q
from rest_framework import mixins
from rest_framework import permissions
from rest_framework import status
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from . import models
from . import serializers


class TodoViewSet(viewsets.ModelViewSet):
    queryset = models.Todo.objects.all()
    serializer_class = serializers.TodoSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        if not self.request.user.is_superuser:
            return models.Todo.objects.filter(
                Q(user=self.request.user.id) |
                Q(tasks__user__id=self.request.user.id)
            )
        return self.queryset.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TaskViewSet(
        LoginRequiredMixin,
        mixins.CreateModelMixin, mixins.RetrieveModelMixin,
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


class UserCreate(APIView):
    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            if user:
                token = Token.objects.create(user=user)
                json = serializer.data
                token_key = token.key
                json['token'] = token_key
                return Response(
                    json, status=status.HTTP_201_CREATED
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
