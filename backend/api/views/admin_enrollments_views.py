from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from api.permissions import IsAdmin

from academics.models import (
    Enrollment,
    Student,
    Course,
    CourseOffering
)


class AdminEnrollmentsAPIView(APIView):

    permission_classes = [
        IsAdmin
    ]

    def get(self, request):

        enrollments = Enrollment.objects.select_related(
            "student",
            "student__user",
            "course",
            "offering"
        )

        data = []

        for enrollment in enrollments:

            data.append({

                "id":
                    enrollment.id,

                "student":
                    enrollment.student.user.username
                    if enrollment.student
                    and enrollment.student.user
                    else "Unknown Student",

                "course":
                    enrollment.course.name
                    if enrollment.course
                    else "Unknown Course",

                "status":
                    enrollment.status,

                "grade":
                    enrollment.final_grade
                    if enrollment.final_grade
                    is not None
                    else "N/A"

            })

        return Response(data)

    def post(
        self,
        request
    ):

        try:

            student = Student.objects.get(

                id=request.data.get(
                    "student"
                )

            )

            offering = CourseOffering.objects.get(

                id=request.data.get(
                    "offering"
                )

            )

            enrollment = Enrollment.objects.create(

                student=student,

                course=offering.course,

                offering=offering,

                semester=offering.semester,

                status=request.data.get(

                    "status",

                    "ENROLLED"

                ),

                final_grade=request.data.get(
                    "final_grade"
                )

            )

            return Response({

                "message":
                    "Enrollment created successfully",

                "id":
                    enrollment.id

            },

            status=status.HTTP_201_CREATED)

        except Student.DoesNotExist:

            return Response(

                {
                    "error":
                    "Student not found"
                },

                status=status.HTTP_400_BAD_REQUEST

            )

        except CourseOffering.DoesNotExist:

            return Response(

                {
                    "error":
                    "Course offering not found"
                },

                status=status.HTTP_400_BAD_REQUEST

            )

        except Exception as e:

            return Response(

                {
                    "error":
                    str(e)
                },

                status=status.HTTP_400_BAD_REQUEST

            )