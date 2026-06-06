from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from academics.models import (
    Staff,
    CourseOffering
)


class StaffTimetableAPIView(
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

        offerings = CourseOffering.objects.filter(
            instructor=staff
        ).select_related(
            "course",
            "semester"
        )

        data = []

        for offering in offerings:

            data.append({

                "course_code":
                    offering.course.code,

                "course_name":
                    offering.course.name,

                "section":
                    offering.section,

                "room":
                    offering.room,

                "schedule":
                    offering.schedule,

                "semester":
                    str(
                        offering.semester
                    )

            })

        return Response(
            data
        )