from datetime import date

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from academics.models import (
    Enrollment,
    Attendance
)


class StaffAttendanceAPIView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def get(
        self,
        request,
        offering_id
    ):

        enrollments = Enrollment.objects.filter(
            offering_id=offering_id
        ).select_related(
            "student",
            "student__user"
        )

        data = []

        for enrollment in enrollments:

            data.append({

                "enrollment_id":
                    enrollment.id,

                "student_id":
                    enrollment.student.student_id,

                "student":
                    enrollment.student.user.username,

                "present":
                    True

            })

        return Response(
            data
        )

    def post(
        self,
        request,
        offering_id
    ):

        records = request.data.get(
            "attendance",
            []
        )

        for record in records:

            Attendance.objects.update_or_create(

                enrollment_id=
                    record[
                        "enrollment_id"
                    ],

                date=date.today(),

                defaults={

                    "status":

                        "PRESENT"

                        if record[
                            "present"
                        ]

                        else

                        "ABSENT"

                }

            )

        return Response({

            "message":
                "Attendance saved successfully"

        })