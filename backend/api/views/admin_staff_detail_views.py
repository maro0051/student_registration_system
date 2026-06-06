from django.contrib.auth import get_user_model

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from academics.models import (
    Staff
)

User = get_user_model()


class AdminStaffDetailAPIView(APIView):

    def get(
        self,
        request,
        pk
    ):

        try:

            staff = Staff.objects.select_related(
                "user",
                "department"
            ).get(
                pk=pk
            )

            return Response({

                "id":
                    staff.id,

                "employee_id":
                    staff.employee_id,

                "username":
                    staff.user.username,

                "email":
                    staff.user.email,

                "department":
                    staff.department.id
                    if staff.department
                    else "",

                "department_name":
                    staff.department.name
                    if staff.department
                    else "",

            })

        except Staff.DoesNotExist:

            return Response({

                "error":
                    "Staff not found"

            },

            status=status.HTTP_404_NOT_FOUND)

    def put(
        self,
        request,
        pk
    ):

        try:

            staff = Staff.objects.select_related(
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

            department_id = request.data.get(
                "department"
            )

            if username:

                exists = User.objects.filter(
                    username=username
                ).exclude(
                    id=staff.user.id
                ).exists()

                if exists:

                    return Response({

                        "error":
                            "Username already exists"

                    },

                    status=status.HTTP_400_BAD_REQUEST)

                staff.user.username = username

            if email:

                staff.user.email = email

            staff.user.save()

            if department_id not in [
                "",
                None
            ]:

                staff.department_id = int(
                    department_id
                )

            else:

                staff.department = None

            staff.save()

            return Response({

                "message":
                    "Staff updated successfully"

            })

        except Staff.DoesNotExist:

            return Response({

                "error":
                    "Staff not found"

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

            staff = Staff.objects.get(
                pk=pk
            )

            if staff.user:

                staff.user.delete()

            else:

                staff.delete()

            return Response({

                "message":
                    "Staff deleted successfully"

            })

        except Staff.DoesNotExist:

            return Response({

                "error":
                    "Staff not found"

            },

            status=status.HTTP_404_NOT_FOUND)