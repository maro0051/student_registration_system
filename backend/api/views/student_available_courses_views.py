from rest_framework.views import APIView
from rest_framework.response import Response

from api.permissions import IsStudent

from academics.models import (
    CourseOffering,
    Enrollment,
    Student
)


class StudentAvailableCoursesAPIView(
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

        enrolled_ids = Enrollment.objects.filter(
            student=student
        ).values_list(
            "offering_id",
            flat=True
        )

        offerings = CourseOffering.objects.select_related(
            "course",
            "instructor",
            "semester"
        )

        data = []

        for offering in offerings:

            if offering.id in enrolled_ids:

                continue

            data.append({

                "id":
                    offering.id,

                "course":
                    offering.course.name,

                "course_code":
                    offering.course.code,

                "section":
                    offering.section,

                "room":
                    offering.room,

                "schedule":
                    offering.schedule,

                "capacity":
                    offering.capacity,

                "remaining":
                    offering.seats_remaining(),

                "semester":
                    str(
                        offering.semester
                    )

            })

        return Response(data)