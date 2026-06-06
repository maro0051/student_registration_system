from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from academics.models import Course

from api.serializers import CourseSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

class CourseListAPIView(
    generics.ListAPIView
):

    queryset = Course.objects.select_related(
        "department",
        "program"
    )

    serializer_class = CourseSerializer

    permission_classes = [
        IsAuthenticated
    ]

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter
    ]

    filterset_fields = [
        "code",
        "name"
    ]

    search_fields = [
        "code",
        "name"
    ]