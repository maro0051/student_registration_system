from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from academics.models import Course


class AdminCoursesAPIView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        courses = Course.objects.select_related(
            "department",
            "program"
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
                    course.credits,

                "program":
                    course.program.name
                    if course.program
                    else "",

                "program_id":
                    course.program.id
                    if course.program
                    else None,

                "department":
                    course.department.name
                    if course.department
                    else "",

                "department_id":
                    course.department.id
                    if course.department
                    else None,

            })

        return Response(data)

    def post(self, request):

        try:

            code = request.data.get(
                "code"
            )

            name = request.data.get(
                "name"
            )

            credits = request.data.get(
                "credits"
            )

            program_id = request.data.get(
                "program"
            )

            department_id = request.data.get(
                "department"
            )

            if not code:

                return Response({

                    "error":
                        "Course code is required"

                },

                status=status.HTTP_400_BAD_REQUEST)

            if not name:

                return Response({

                    "error":
                        "Course name is required"

                },

                status=status.HTTP_400_BAD_REQUEST)

            course = Course.objects.create(

                code=code,

                name=name,

                credits=credits,

                program_id=(
                    int(program_id)
                    if program_id
                    else None
                ),

                department_id=(
                    int(department_id)
                    if department_id
                    else None
                )

            )

            return Response({

                "message":
                    "Course created successfully",

                "id":
                    course.id

            },

            status=status.HTTP_201_CREATED)

        except Exception as e:

            return Response({

                "error":
                    str(e)

            },

            status=status.HTTP_400_BAD_REQUEST)