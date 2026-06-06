from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from academics.models import (
    Staff,
    CourseOffering,
    Enrollment
)

class StaffDashboardAPIView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        staff = Staff.objects.get(
            user=request.user
        )

        offerings = CourseOffering.objects.filter(
            instructor=staff
        )

        total_students = Enrollment.objects.filter(
            offering__in=offerings
        ).count()

        return Response({

            "employee_id":
                staff.employee_id,

            "name":
                request.user.get_full_name()
                or request.user.username,

            "department":
                staff.department.name
                if staff.department
                else "N/A",

            "total_classes":
                offerings.count(),

            "total_students":
                total_students,

            "recent_classes": [

                {
                    "id":
                        offering.id,

                    "course":
                        offering.course.name,

                    "section":
                        offering.section,

                    "room":
                        offering.room

                }

                for offering in offerings[:5]

            ]

        })