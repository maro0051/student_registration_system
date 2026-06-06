from rest_framework.views import APIView
from rest_framework.response import Response

from academics.models import Student
from academics.models import Enrollment


class AdminTranscriptAPIView(APIView):

    def get(self, request, student_id):

        student = Student.objects.get(
            id=student_id
        )

        enrollments = Enrollment.objects.filter(
            student=student
        ).select_related(
            "course"
        )

        courses = []

        total_gpa = 0

        count = 0

        for enrollment in enrollments:

            courses.append({

                "course":
                    enrollment.course.name,

                "grade":
                    enrollment.final_grade,

                "letter_grade":
                    enrollment.letter_grade,

                "gpa":
                    enrollment.gpa_points

            })

            total_gpa += (
                enrollment.gpa_points or 0
            )

            count += 1

        return Response({

            "student":
                student.user.username,

            "student_id":
                student.student_id,

            "program":
                student.program.name
                if student.program
                else "",

            "cgpa":
                round(
                    total_gpa / count,
                    2
                ) if count > 0 else 0,

            "courses":
                courses

        })