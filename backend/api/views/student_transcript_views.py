from rest_framework.views import APIView
from rest_framework.response import Response

from academics.models import (
    Student,
    Enrollment
)


class StudentTranscriptAPIView(
    APIView
):

    def get(self, request):

        student = Student.objects.get(
            user=request.user
        )

        enrollments = Enrollment.objects.filter(
            student=student
        ).select_related(
            "course"
        )

        courses = []

        total_points = 0
        total_credits = 0

        for enrollment in enrollments:

            credits = (
                enrollment.course.credits
                or 0
            )

            points = (
                enrollment.gpa_points
                or 0
            )

            total_points += (
                points * credits
            )

            total_credits += credits

            courses.append({

                "course_code":
                    enrollment.course.code,

                "course_name":
                    enrollment.course.name,

                "credits":
                    credits,

                "final_grade":
                    enrollment.final_grade,

                "letter_grade":
                    enrollment.letter_grade,

                "gpa_points":
                    points

            })

        gpa = 0

        if total_credits > 0:

            gpa = round(
                total_points /
                total_credits,
                2
            )

        return Response({

            "student":
                student.user.username,

            "student_id":
                student.student_id,

            "total_credits":
                total_credits,

            "gpa":
                gpa,

            "courses":
                courses

        })