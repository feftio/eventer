from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.urls import include
from django.conf.urls.static import static


api_urls = [
    path('user/', include('user.urls')),
    path('event/', include('event.urls')),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path(settings.API_PREFIX, include(api_urls)),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
