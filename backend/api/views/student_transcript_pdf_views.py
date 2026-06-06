from io import BytesIO

from django.http import FileResponse

from rest_framework.views import APIView

from api.permissions import IsStudent

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table
)

from reportlab.lib.styles import (
    getSampleStyleSheet
)

from academics.models import (
    Student,
    Enrollment
)


class StudentTranscriptPDFAPIView(
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

        buffer = BytesIO()

        document = SimpleDocTemplate(
            buffer
        )

        styles = getSampleStyleSheet()

        content = []

        content.append(

            Paragraph(

                "Official Academic Transcript",

                styles["Title"]

            )

        )

        content.append(
            Spacer(1, 20)
        )

        content.append(

            Paragraph(

                f"Student: {student.user.username}",

                styles["Normal"]

            )

        )

        content.append(

            Paragraph(

                f"Student ID: {student.student_id}",

                styles["Normal"]

            )

        )

        content.append(
            Spacer(1, 20)
        )

        table_data = [[

            "Code",

            "Course",

            "Credits",

            "Final Grade",

            "Letter Grade"

        ]]

        for enrollment in enrollments:

            table_data.append([

                enrollment.course.code,

                enrollment.course.name,

                str(
                    enrollment.course.credits
                ),

                str(
                    enrollment.final_grade
                ),

                enrollment.letter_grade

            ])

        content.append(
            Table(table_data)
        )

        document.build(
            content
        )

        buffer.seek(0)

        return FileResponse(

            buffer,

            as_attachment=True,

            filename="transcript.pdf"

        )