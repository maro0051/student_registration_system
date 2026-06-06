from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from academics.models import Department


class AdminDepartmentsAPIView(
    APIView
):

    def get(
        self,
        request
    ):

        departments = Department.objects.all()

        data = []

        for department in departments:

            data.append({

                "id":
                    department.id,

                "name":
                    department.name,

                "code":
                    department.code

            })

        return Response(
            data
        )

    def post(
        self,
        request
    ):

        department = Department.objects.create(

                name=request.data.get(
                    "name"
                ),

                code=request.data.get(
                    "code"
                )

            )

        return Response({

            "id":
                department.id,

            "message":
                "Department created"

        })