from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from academics.models import Department


class AdminDepartmentDetailAPIView(APIView):

    def get(self, request, pk):

        try:

            department = Department.objects.get(
                pk=pk
            )

            return Response({
                "id": department.id,
                "name": department.name,
                "code": department.code
            })

        except Department.DoesNotExist:

            return Response(
                {
                    "error": "Department not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

    def put(self, request, pk):

        try:

            department = Department.objects.get(
                pk=pk
            )

            department.name = request.data.get(
                "name",
                department.name
            )

            department.code = request.data.get(
                "code",
                department.code
            )

            department.save()

            return Response({
                "message": "Department updated"
            })

        except Department.DoesNotExist:

            return Response(
                {
                    "error": "Department not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

    def delete(self, request, pk):

        try:

            department = Department.objects.get(
                pk=pk
            )

            department.delete()

            return Response({
                "message": "Department deleted"
            })

        except Department.DoesNotExist:

            return Response(
                {
                    "error": "Department not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )