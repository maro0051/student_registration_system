from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from academics.models import Program
from academics.models import Department


class AdminProgramDetailAPIView(
    APIView
):

    def get(
        self,
        request,
        pk
    ):

        try:

            program = Program.objects.get(
                pk=pk
            )

            return Response({

                "id":
                    program.id,

                "name":
                    program.name,

                "code":
                    program.code,

                "department":
                    (
                        program.department.id
                        if program.department
                        else None
                    ),

                "department_name":
                    (
                        program.department.name
                        if program.department
                        else None
                    )

            })

        except Program.DoesNotExist:

            return Response(

                {
                    "error":
                    "Program not found"
                },

                status=status.HTTP_404_NOT_FOUND

            )

    def put(
        self,
        request,
        pk
    ):

        try:

            program = Program.objects.get(
                pk=pk
            )

            program.name = request.data.get(
                "name",
                program.name
            )

            program.code = request.data.get(
                "code",
                program.code
            )

            department_id = request.data.get(
                "department"
            )

            if department_id:

                program.department = (
                    Department.objects.get(
                        id=department_id
                    )
                )

            program.save()

            return Response({

                "message":
                    "Program updated successfully"

            })

        except Program.DoesNotExist:

            return Response(

                {
                    "error":
                    "Program not found"
                },

                status=status.HTTP_404_NOT_FOUND

            )

    def delete(
        self,
        request,
        pk
    ):

        try:

            program = Program.objects.get(
                pk=pk
            )

            program.delete()

            return Response({

                "message":
                    "Program deleted successfully"

            })

        except Program.DoesNotExist:

            return Response(

                {
                    "error":
                    "Program not found"
                },

                status=status.HTTP_404_NOT_FOUND

            )