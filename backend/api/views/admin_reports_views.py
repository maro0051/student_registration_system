# api/views/admin_reports_views.py

from rest_framework.views import APIView
from rest_framework.response import Response

from academics.models import Enrollment


class AdminReportsAPIView(APIView):

    def get(self, request):

        enrollments = Enrollment.objects.select_related(
            "student",
            "student__user",
            "course"
        )

        data = []

        for enrollment in enrollments:

            data.append({

                "id":
                    enrollment.id,

                "student":
                    enrollment.student.user.username,

                "course":
                    enrollment.course.name,

                "status":
                    enrollment.status,

                "midterm_grade":
                    enrollment.midterm_grade,

                "final_grade":
                    enrollment.final_grade,

                "letter_grade":
                    enrollment.letter_grade,

                "gpa_points":
                    enrollment.gpa_points

            })

        return Response(data)