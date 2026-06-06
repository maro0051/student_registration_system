from django.contrib.auth import get_user_model

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from academics.models import (
    Staff,
    Department
)

User = get_user_model()


class AdminStaffAPIView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        staff_members = Staff.objects.select_related(
            "user",
            "department"
        )

        data = []

        for staff in staff_members:

            data.append({

                "id":
                    staff.id,

                "employee_id":
                    staff.employee_id,

                "username":
                    staff.user.username,

                "email":
                    staff.user.email,

                "department":
                    staff.department.name
                    if staff.department
                    else "",

                "department_id":
                    staff.department.id
                    if staff.department
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

            staff = Staff(

                user=user

            )

            if department_id:

                staff.department_id = int(
                    department_id
                )

            staff.save()

            return Response({

                "message":
                    "Staff created successfully",

                "id":
                    staff.id,

                "employee_id":
                    staff.employee_id

            },

            status=status.HTTP_201_CREATED)

        except Exception as e:

            return Response({

                "error":
                    str(e)

            },

            status=status.HTTP_400_BAD_REQUEST)