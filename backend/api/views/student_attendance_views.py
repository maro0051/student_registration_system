from rest_framework.views import APIView
from rest_framework.response import Response

from academics.models import (
    Student,
    Attendance
)


class StudentAttendanceAPIView(
    APIView
):

    def get(
        self,
        request
    ):

        student = Student.objects.get(
            user=request.user
        )

        records = Attendance.objects.filter(

            enrollment__student=
                student

        )

        data = []

        for record in records:

            data.append({

                "course":
                    record.enrollment.course.name,

                "date":
                    record.date,

                "status":
                    record.status

            })

        return Response(
            data
        )