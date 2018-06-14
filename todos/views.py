from django.db.models import Q
from knox.models import AuthToken
from rest_framework import generics
from rest_framework import mixins
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.response import Response

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


class RegistrationView(generics.GenericAPIView):
    serializer_class = serializers.CreateUserSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            'user': serializers.UserSerializer(
                user, context=self.get_serializer_context()
            ).data,
            'token': AuthToken.objects.create(user)
        })


class LoginView(generics.GenericAPIView):
    serializer_class = serializers.LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            'user': serializers.UserSerializer(
                user, context=self.get_serializer_context()).data,
            'token': AuthToken.objects.create(user)
        })
