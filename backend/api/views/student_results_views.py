from rest_framework.views import APIView
from rest_framework.response import Response

from api.permissions import IsStudent

from academics.models import (
    Student,
    Enrollment
)


class StudentResultsAPIView(
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
        ).select_related(
            "course"
        )

        data = []

        total_gpa = 0

        count = 0

        for enrollment in enrollments:

            data.append({

                "course":
                    enrollment.course.name,

                "midterm_grade":
                    enrollment.midterm_grade,

                "final_grade":
                    enrollment.final_grade,

                "letter_grade":
                    enrollment.letter_grade,

                "gpa_points":
                    enrollment.gpa_points

            })

            if enrollment.gpa_points:

                total_gpa += (
                    enrollment.gpa_points
                )

                count += 1

        average_gpa = round(

            total_gpa / count,

            2

        ) if count > 0 else 0

        return Response({

            "results":
                data,

            "average_gpa":
                average_gpa

        })