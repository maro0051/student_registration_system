from rest_framework.views import APIView
from rest_framework.response import Response

from academics.models import (
    Course
)


class ProgramCoursesAPIView(
    APIView
):

    def get(
        self,
        request,
        program_id
    ):

        courses = Course.objects.filter(
            program_id=program_id
        )

        data = []

        for course in courses:

            data.append({

                "id":
                    course.id,

                "code":
                    course.code,

                "name":
                    course.name,

                "credits":
                    course.credits

            })

        return Response(
            data
        )