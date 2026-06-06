from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from academics.models import Course
from academics.models import Program
from academics.models import Department


class AdminCourseDetailAPIView(
    APIView
):

    def get(
        self,
        request,
        pk
    ):

        try:

            course = Course.objects.get(
                pk=pk
            )

            return Response({

                "id":
                    course.id,

                "code":
                    course.code,

                "name":
                    course.name,

                "credits":
                    course.credits,

                "program":
                    (
                        course.program.id
                        if course.program
                        else None
                    ),

                "department":
                    (
                        course.department.id
                        if course.department
                        else None
                    )

            })

        except Course.DoesNotExist:

            return Response(

                {
                    "error":
                    "Course not found"
                },

                status=status.HTTP_404_NOT_FOUND

            )

    def put(
        self,
        request,
        pk
    ):

        try:

            course = Course.objects.get(
                pk=pk
            )

            course.code = request.data.get(
                "code",
                course.code
            )

            course.name = request.data.get(
                "name",
                course.name
            )

            course.credits = request.data.get(
                "credits",
                course.credits
            )

            program_id = request.data.get(
                "program"
            )

            if program_id:

                course.program = (
                    Program.objects.get(
                        id=program_id
                    )
                )

            department_id = request.data.get(
                "department"
            )

            if department_id:

                course.department = (
                    Department.objects.get(
                        id=department_id
                    )
                )

            course.save()

            return Response({

                "message":
                    "Course updated successfully"

            })

        except Course.DoesNotExist:

            return Response(

                {
                    "error":
                    "Course not found"
                },

                status=status.HTTP_404_NOT_FOUND

            )

    def delete(
        self,
        request,
        pk
    ):

        try:

            course = Course.objects.get(
                pk=pk
            )

            course.delete()

            return Response({

                "message":
                    "Course deleted successfully"

            })

        except Course.DoesNotExist:

            return Response(

                {
                    "error":
                    "Course not found"
                },

                status=status.HTTP_404_NOT_FOUND

            )