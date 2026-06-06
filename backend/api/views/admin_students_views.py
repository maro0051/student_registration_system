from django.contrib.auth import get_user_model

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from academics.models import (
    Student,
    Program,
    Department
)

User = get_user_model()


class AdminStudentsAPIView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        students = Student.objects.select_related(
            "user",
            "program",
            "department"
        )

        data = []

        for student in students:

            data.append({

                "id":
                    student.id,

                "student_id":
                    student.student_id,

                "username":
                    student.user.username,

                "email":
                    student.user.email,

                "program":
                    student.program.name
                    if student.program
                    else "",

                "program_id":
                    student.program.id
                    if student.program
                    else None,

                "department":
                    student.department.name
                    if student.department
                    else "",

                "department_id":
                    student.department.id
                    if student.department
                    else None,

            })

        return Response(data)

    def post(self, request):

        try:

            username = request.data.get(
                "username"
            )

            email = request.data.get(
                "email"
            )

            password = request.data.get(
                "password"
            )

            program_id = request.data.get(
                "program"
            )

            department_id = request.data.get(
                "department"
            )

            if User.objects.filter(
                username=username
            ).exists():

                return Response({

                    "error":
                        "Username already exists"

                },

                status=status.HTTP_400_BAD_REQUEST)

            user = User.objects.create_user(

                username=username,

                email=email,

                password=password

            )

            student = Student.objects.create(

                user=user,

                program_id=program_id
                if program_id
                else None,

                department_id=department_id
                if department_id
                else None

            )

            return Response({

                "message":
                    "Student created successfully",

                "id":
                    student.id,

                "student_id":
                    student.student_id

            },

            status=status.HTTP_201_CREATED)

        except Exception as e:

            return Response({

                "error":
                    str(e)

            },

            status=status.HTTP_400_BAD_REQUEST)