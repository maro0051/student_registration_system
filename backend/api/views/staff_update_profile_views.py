from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from academics.models import Staff


class StaffUpdateProfileAPIView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def put(
        self,
        request
    ):

        staff = Staff.objects.get(
            user=request.user
        )

        staff.phone_number = request.data.get(
            "phone_number"
        )

        staff.address = request.data.get(
            "address"
        )

        if "profile_picture" in request.FILES:

            staff.profile_picture = (
                request.FILES[
                    "profile_picture"
                ]
            )

        staff.save()

        return Response({

            "message":
                "Profile updated successfully"

        })