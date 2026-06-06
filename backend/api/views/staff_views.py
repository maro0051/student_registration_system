from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from academics.models import Staff

from api.serializers import StaffSerializer


class StaffListAPIView(
    generics.ListAPIView
):

    queryset = Staff.objects.select_related(
        "user",
        "department"
    )

    serializer_class = StaffSerializer

    permission_classes = [
        IsAuthenticated
    ]