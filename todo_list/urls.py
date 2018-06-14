
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from todos import views

api_routers = routers.SimpleRouter()
api_routers.register(r'todos', views.TodoViewSet)
api_routers.register(r'tasks', views.TaskViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('docs/', include_docs_urls(title='Todo List')),
    path('api/auth/register/', views.RegistrationView.as_view(),
         name='register-user'),
    path('api/auth/login/', views.LoginView.as_view()),
    path('api/auth/', include('knox.urls')),
    path('api/', include((api_routers.urls, 'todos', ))),
    path('', include(('frontend.urls', 'frontend'))),
]
