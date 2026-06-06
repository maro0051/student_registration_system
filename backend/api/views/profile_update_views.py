from rest_framework.views import APIView
from rest_framework.response import Response

from academics.models import (
    Student,
    Staff
)


class ProfileUpdateAPIView(
    APIView
):

    def get(
        self,
        request
    ):

        if request.user.role == "student":

            profile = Student.objects.get(
                user=request.user
            )

            return Response({

                "username":
                    request.user.username,

                "email":
                    request.user.email,

                "phone_number":
                    profile.phone_number,

                "address":
                    profile.address,

                "emergency_contact":
                    profile.emergency_contact

            })

        profile = Staff.objects.get(
            user=request.user
        )

        return Response({

            "username":
                request.user.username,

            "email":
                request.user.email,

            "phone_number":
                profile.phone_number,

            "address":
                profile.address

        })

    def put(
        self,
        request
    ):

        user = request.user

        user.email = request.data.get(
            "email",
            user.email
        )

        user.save()

        if user.role == "student":

            profile = Student.objects.get(
                user=user
            )

            profile.phone_number = request.data.get(
                "phone_number"
            )

            profile.address = request.data.get(
                "address"
            )

            profile.emergency_contact = request.data.get(
                "emergency_contact"
            )

            profile.save()

        else:

            profile = Staff.objects.get(
                user=user
            )

            profile.phone_number = request.data.get(
                "phone_number"
            )

            profile.address = request.data.get(
                "address"
            )

            profile.save()

        return Response({

            "message":
                "Profile updated"

        })