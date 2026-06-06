from django.http import HttpResponse

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table
)

from reportlab.lib.styles import getSampleStyleSheet

from academics.models import (
    Student,
    Enrollment
)


def generate_transcript_pdf(
    request,
    student_id
):

    student = Student.objects.select_related(
        "user",
        "program"
    ).get(
        id=student_id
    )

    enrollments = Enrollment.objects.filter(
        student=student
    ).select_related(
        "course"
    )

    response = HttpResponse(
        content_type="application/pdf"
    )

    response[
        "Content-Disposition"
    ] = (

        f'attachment; filename="transcript_{student.student_id}.pdf"'

    )

    doc = SimpleDocTemplate(
        response
    )

    styles = getSampleStyleSheet()

    elements = []

    elements.append(

        Paragraph(
            "Official Transcript",
            styles["Title"]
        )

    )

    elements.append(
        Spacer(1, 20)
    )

    elements.append(

        Paragraph(

            f"Student: {student.user.username}",

            styles["Normal"]

        )

    )

    elements.append(

        Paragraph(

            f"Student ID: {student.student_id}",

            styles["Normal"]

        )

    )

    data = [

        [

            "Course",

            "Final Grade",

            "Letter Grade",

            "GPA"

        ]

    ]

    for enrollment in enrollments:

        data.append([

            enrollment.course.name,

            enrollment.final_grade,

            enrollment.letter_grade,

            enrollment.gpa_points

        ])

    table = Table(data)

    elements.append(table)

    doc.build(elements)

    return response