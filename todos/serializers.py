from rest_framework import serializers


class TodoSerializer(serializers.ModelSerializer):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class TaskSerializer(serializers.ModelSerializer):
    pass


class UserSerializer(serializers.ModelSerializer):
    pass
