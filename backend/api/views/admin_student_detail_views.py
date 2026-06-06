from django.contrib.auth import get_user_model

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from academics.models import Student


User = get_user_model()


class AdminStudentDetailAPIView(APIView):

    def get(
        self,
        request,
        pk
    ):

        try:

            student = Student.objects.select_related(
                "user",
                "program",
                "department"
            ).get(
                pk=pk
            )

            return Response({

                "id":
                    student.id,

                "student_id":
                    student.student_id,

                "username":
                    student.user.username
                    if student.user
                    else "",

                "email":
                    student.user.email
                    if student.user
                    else "",

                "program":
                    student.program.id
                    if student.program
                    else "",

                "department":
                    student.department.id
                    if student.department
                    else "",

            })

        except Student.DoesNotExist:

            return Response({

                "error":
                    "Student not found"

            },

            status=status.HTTP_404_NOT_FOUND)

    def put(
        self,
        request,
        pk
    ):

        try:

            student = Student.objects.select_related(
                "user"
            ).get(
                pk=pk
            )

            username = request.data.get(
                "username"
            )

            email = request.data.get(
                "email"
            )

            program_id = request.data.get(
                "program"
            )

            department_id = request.data.get(
                "department"
            )

            if username:

                exists = User.objects.filter(
                    username=username
                ).exclude(
                    id=student.user.id
                ).exists()

                if exists:

                    return Response({

                        "error":
                            "Username already exists"

                    },

                    status=status.HTTP_400_BAD_REQUEST)

                student.user.username = username

            if email:

                student.user.email = email

            student.user.save()

            if program_id not in [
                "",
                None
            ]:

                student.program_id = int(
                    program_id
                )

            else:

                student.program = None

            if department_id not in [
                "",
                None
            ]:

                student.department_id = int(
                    department_id
                )

            else:

                student.department = None

            student.save()

            return Response({

                "message":
                    "Student updated successfully"

            })

        except Student.DoesNotExist:

            return Response({

                "error":
                    "Student not found"

            },

            status=status.HTTP_404_NOT_FOUND)

        except Exception as e:

            return Response({

                "error":
                    str(e)

            },

            status=status.HTTP_400_BAD_REQUEST)

    def delete(
        self,
        request,
        pk
    ):

        try:

            student = Student.objects.get(
                pk=pk
            )

            if student.user:

                student.user.delete()

            else:

                student.delete()

            return Response({

                "message":
                    "Student deleted successfully"

            })

        except Student.DoesNotExist:

            return Response({

                "error":
                    "Student not found"

            },

            status=status.HTTP_404_NOT_FOUND)