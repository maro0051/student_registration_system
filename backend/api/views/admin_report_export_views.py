# api/views/admin_report_export_views.py

import csv

from django.http import HttpResponse

from academics.models import Enrollment

from rest_framework.views import APIView


class AdminReportExportAPIView(
    APIView
):

    def get(self, request):

        response = HttpResponse(
            content_type="text/csv"
        )

        response[
            "Content-Disposition"
        ] = (
            'attachment; '
            'filename="enrollment_report.csv"'
        )

        writer = csv.writer(
            response
        )

        writer.writerow([

            "Student",

            "Course",

            "Status",

            "Midterm Grade",

            "Final Grade",

            "Letter Grade",

            "GPA"

        ])

        enrollments = (
            Enrollment.objects
            .select_related(
                "student",
                "student__user",
                "course"
            )
        )

        for enrollment in enrollments:

            writer.writerow([

                enrollment.student.user.username,

                enrollment.course.name,

                enrollment.status,

                enrollment.midterm_grade,

                enrollment.final_grade,

                enrollment.letter_grade,

                enrollment.gpa_points

            ])

        return response