from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from api.permissions import IsStudent

from academics.models import (
    Student,
    Enrollment,
    CourseOffering
)


class StudentRegisterCourseAPIView(
    APIView
):

    permission_classes = [
        IsStudent
    ]

    def post(
        self,
        request,
        offering_id
    ):

        try:

            student = Student.objects.get(
                user=request.user
            )

            offering = CourseOffering.objects.get(
                id=offering_id
            )

            exists = Enrollment.objects.filter(
                student=student,
                offering=offering
            ).exists()

            if exists:

                return Response(

                    {
                        "error":
                        "Already registered"
                    },

                    status=status.HTTP_400_BAD_REQUEST

                )

            if offering.seats_remaining() <= 0:

                return Response(

                    {
                        "error":
                        "No seats available"
                    },

                    status=status.HTTP_400_BAD_REQUEST

                )

            Enrollment.objects.create(

                student=student,

                course=offering.course,

                offering=offering,

                semester=offering.semester,

                status="ENROLLED"

            )

            return Response({

                "message":
                    "Course registered successfully"

            })

        except CourseOffering.DoesNotExist:

            return Response(

                {
                    "error":
                    "Course offering not found"
                },

                status=status.HTTP_404_NOT_FOUND

            )