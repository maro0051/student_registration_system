from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from api.permissions import IsStudent

from academics.models import (
    Student,
    Enrollment
)


class StudentTimetableAPIView(
    APIView
):

    permission_classes = [
        IsStudent
    ]

    def get(
        self,
        request
    ):

        student = Student.objects.get(
            user=request.user
        )

        enrollments = Enrollment.objects.filter(
            student=student
        )

        data = []

        for enrollment in enrollments:

            offering = enrollment.offering

            if not offering:
                continue

            data.append({

                "course_code":
                    offering.course.code,

                "course_name":
                    offering.course.name,

                "instructor":
                    offering.instructor.user.username,

                "schedule":
                    offering.schedule,

                "room":
                    offering.room,

                "section":
                    offering.section,

                "semester":
                    offering.semester.name

            })

        return Response(data)