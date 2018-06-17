
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from todos import views
from django.views.generic import TemplateView


api_routers = routers.SimpleRouter()
api_routers.register(r'todos', views.TodoViewSet)
api_routers.register(r'tasks', views.TaskViewSet)
api_routers.register(r'user', views.UserViewSet)


urlpatterns = [
    path('rest-auth/', include('rest_auth.urls')),
    path('api/auth/login/', views.LoginView.as_view()),
    path('api/auth/', include('knox.urls')),
    path('admin/', admin.site.urls),
    path('docs/', include_docs_urls(title='Todo List')),
    path('api/', include((api_routers.urls, 'todos', ))),
    path('api/auth/register/', views.RegistrationView.as_view(),
         name='register-user'),
    path('^', include(('frontend.urls', 'frontend'))),
    re_path(r'^', include('django.contrib.auth.urls')),
    re_path(r'^', TemplateView.as_view(template_name="frontend/home.html")),
]
