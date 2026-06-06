from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from academics.models import Student

from api.serializers import StudentSerializer


class StudentListAPIView(
    generics.ListAPIView
):

    queryset = Student.objects.select_related(
        "user",
        "program",
        "department"
    )

    serializer_class = StudentSerializer

    permission_classes = [
        IsAuthenticated
    ]