from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from academics.models import Enrollment

from api.serializers import EnrollmentSerializer


class EnrollmentListAPIView(
    generics.ListAPIView
):

    queryset = Enrollment.objects.select_related(
        "student",
        "offering",
        "offering__course"
    )

    serializer_class = EnrollmentSerializer

    permission_classes = [
        IsAuthenticated
    ]