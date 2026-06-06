from django.http import HttpResponse

from reportlab.platypus import (
    SimpleDocTemplate,
    Table,
    TableStyle,
    Paragraph,
    Spacer
)

from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet

from rest_framework.views import APIView

from academics.models import Enrollment


class AdminReportPDFAPIView(
    APIView
):

    def get(self, request):

        response = HttpResponse(
            content_type="application/pdf"
        )

        response[
            "Content-Disposition"
        ] = (
            'attachment; '
            'filename="enrollment_report.pdf"'
        )

        doc = SimpleDocTemplate(
            response
        )

        styles = getSampleStyleSheet()

        elements = []

        elements.append(

            Paragraph(

                "Enrollment Report",

                styles["Title"]

            )

        )

        elements.append(
            Spacer(1, 20)
        )

        data = [[

            "Student",

            "Course",

            "Status",

            "Final Grade",

            "Letter"

        ]]

        enrollments = (
            Enrollment.objects
            .select_related(
                "student",
                "student__user",
                "course"
            )
        )

        for enrollment in enrollments:

            data.append([

                enrollment.student.user.username,

                enrollment.course.name,

                enrollment.status,

                str(
                    enrollment.final_grade
                ),

                enrollment.letter_grade

            ])

        table = Table(data)

        table.setStyle(

            TableStyle([

                (
                    "BACKGROUND",

                    (0, 0),

                    (-1, 0),

                    colors.grey

                ),

                (
                    "TEXTCOLOR",

                    (0, 0),

                    (-1, 0),

                    colors.whitesmoke

                ),

                (
                    "GRID",

                    (0, 0),

                    (-1, -1),

                    1,

                    colors.black

                )

            ])

        )

        elements.append(
            table
        )

        doc.build(
            elements
        )

        return response