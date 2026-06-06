from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from api.permissions import IsStudent

from academics.models import Student


class StudentProfileUpdateAPIView(
    APIView
):

    permission_classes = [
        IsStudent
    ]

    def put(
        self,
        request
    ):

        try:

            student = Student.objects.get(
                user=request.user
            )

            student.phone_number = request.data.get(
                "phone_number",
                student.phone_number
            )

            student.address = request.data.get(
                "address",
                student.address
            )

            student.emergency_contact = request.data.get(
                "emergency_contact",
                student.emergency_contact
            )
            if "profile_picture" in request.FILES:
                student.profile_picture = request.FILES["profile_picture"]

            student.save()

            return Response({

                "message":
                    "Profile updated successfully"

            })

        except Student.DoesNotExist:

            return Response(

                {
                    "error":
                    "Student not found"
                },

                status=status.HTTP_404_NOT_FOUND

            )

        except Exception as e:

            return Response(

                {
                    "error":
                    str(e)
                },

                status=status.HTTP_400_BAD_REQUEST

            )