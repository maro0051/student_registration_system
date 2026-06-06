from api.permissions import IsStudent

from rest_framework.views import APIView
from rest_framework.response import Response

from academics.models import (
    Student,
    Enrollment
)


class StudentDashboardAPIView(
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

        completed_courses = enrollments.filter(
            status="COMPLETED"
        ).count()

        registered_courses = enrollments.filter(
            status="ENROLLED"
        ).count()

        total_gpa = sum(

            enrollment.gpa_points or 0

            for enrollment in enrollments

        )

        graded_courses = enrollments.exclude(
            final_grade__isnull=True
        ).count()

        average_gpa = round(

            total_gpa / graded_courses,

            2

        ) if graded_courses > 0 else 0

        recent_courses = []

        for enrollment in enrollments.order_by(
            "-id"
        )[:5]:

            recent_courses.append({

                "course":
                    enrollment.course.name,

                "status":
                    enrollment.status,

                "final_grade":
                    enrollment.final_grade,

                "letter_grade":
                    enrollment.letter_grade

            })

        return Response({

            "student_name":
                request.user.username,

            "student_id":
                student.student_id,

            "program":
                student.program.name
                if student.program
                else "Not Assigned",

            "department":
                student.department.name
                if student.department
                else "Not Assigned",

            "total_courses":
                enrollments.count(),

            "completed_courses":
                completed_courses,

            "registered_courses":
                registered_courses,

            "average_gpa":
                average_gpa,

            "recent_courses":
                recent_courses

        })