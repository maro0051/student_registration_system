from rest_framework.views import APIView
from rest_framework.response import Response

from academics.models import (
    Program
)


class DepartmentProgramsAPIView(
    APIView
):

    def get(
        self,
        request,
        department_id
    ):

        programs = Program.objects.filter(
            department_id=department_id
        )

        data = []

        for program in programs:

            data.append({

                "id":
                    program.id,

                "name":
                    program.name

            })

        return Response(
            data
        )