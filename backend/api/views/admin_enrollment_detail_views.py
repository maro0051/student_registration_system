from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from academics.models import (
    Enrollment,
    Student,
    CourseOffering
)


class AdminEnrollmentDetailAPIView(
    APIView
):

    def get(
        self,
        request,
        pk
    ):

        try:

            enrollment = Enrollment.objects.get(
                pk=pk
            )

            return Response({

                "id":
                    enrollment.id,

                "student":
                    enrollment.student.id,

                "offering":
                    enrollment.offering.id
                    if enrollment.offering
                    else None,

                "status":
                    enrollment.status,

                "final_grade":
                    enrollment.final_grade

            })

        except Enrollment.DoesNotExist:

            return Response(

                {
                    "error":
                    "Enrollment not found"
                },

                status=status.HTTP_404_NOT_FOUND

            )

    def put(
        self,
        request,
        pk
    ):

        try:

            enrollment = Enrollment.objects.get(
                pk=pk
            )

            student_id = request.data.get(
                "student"
            )

            offering_id = request.data.get(
                "offering"
            )

            if student_id:

                enrollment.student = (
                    Student.objects.get(
                        id=student_id
                    )
                )

            if offering_id:

                offering = (
                    CourseOffering.objects.get(
                        id=offering_id
                    )
                )

                enrollment.offering = offering

                enrollment.course = (
                    offering.course
                )

                enrollment.semester = (
                    offering.semester
                )

            enrollment.status = request.data.get(

                "status",

                enrollment.status

            )

            final_grade = request.data.get(
                "final_grade"
            )

            if final_grade in [
                "",
                None
            ]:

                enrollment.final_grade = None

            else:

                enrollment.final_grade = float(
                    final_grade
                )

            enrollment.save()

            return Response({

                "message":
                    "Enrollment updated successfully"

            })

        except Enrollment.DoesNotExist:

            return Response(

                {
                    "error":
                    "Enrollment not found"
                },

                status=status.HTTP_404_NOT_FOUND

            )

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

        except ValueError:

            return Response(

                {
                    "error":
                    "Final grade must be a number"
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

    def delete(
        self,
        request,
        pk
    ):

        try:

            enrollment = Enrollment.objects.get(
                pk=pk
            )

            enrollment.delete()

            return Response({

                "message":
                    "Enrollment deleted successfully"

            })

        except Enrollment.DoesNotExist:

            return Response(

                {
                    "error":
                    "Enrollment not found"
                },

                status=status.HTTP_404_NOT_FOUND

            )