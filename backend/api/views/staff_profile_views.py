from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from academics.models import Staff


class StaffProfileAPIView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def get(
        self,
        request
    ):

        staff = Staff.objects.get(
            user=request.user
        )

        return Response({

            "employee_id":
                staff.employee_id,

            "username":
                request.user.username,

            "name":
                request.user.get_full_name()
                or request.user.username,

            "department":
                staff.department.name
                if staff.department
                else "",

            "phone_number":
                staff.phone_number,

            "address":
                staff.address,

            "profile_picture":
                request.build_absolute_uri(
                    staff.profile_picture.url
                )
                if staff.profile_picture
                else None

        })