from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from academics.models import Attendance


class StaffAttendanceReportAPIView(
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

        records = Attendance.objects.filter(

            enrollment__offering_id=
                offering_id

        ).select_related(

            "enrollment",
            "enrollment__student",
            "enrollment__student__user"

        )

        data = []

        for record in records:

            data.append({

                "date":
                    record.date,

                "student_id":
                    record.enrollment.student.student_id,

                "student":
                    record.enrollment.student.user.username,

                "status":
                    record.status

            })

        return Response(
            data
        )