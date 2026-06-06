from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from academics.models import (
    Enrollment
)


class StaffGradesAPIView(
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

                "midterm_grade":
                    enrollment.midterm_grade,

                "final_grade":
                    enrollment.final_grade,

                "letter_grade":
                    enrollment.letter_grade

            })

        return Response(data)

    def post(
        self,
        request,
        offering_id
    ):

        grades = request.data.get(
            "grades",
            []
        )

        for item in grades:

            enrollment = Enrollment.objects.get(
                id=item["enrollment_id"]
            )

            enrollment.midterm_grade = (
                item["midterm_grade"]
            )

            enrollment.final_grade = (
                item["final_grade"]
            )

            enrollment.save()

        return Response({

            "message":
                "Grades saved successfully"

        })