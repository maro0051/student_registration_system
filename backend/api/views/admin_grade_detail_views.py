from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from academics.models import Enrollment


class AdminGradeDetailAPIView(APIView):

    def get(self, request, pk):

        try:

            enrollment = Enrollment.objects.get(
                pk=pk
            )

            return Response({

                "id":
                    enrollment.id,

                "student":
                    enrollment.student.user.username,

                "course":
                    enrollment.course.name,

                "midterm_grade":
                    enrollment.midterm_grade,

                "final_grade":
                    enrollment.final_grade

            })

        except Enrollment.DoesNotExist:

            return Response({

                "error":
                    "Grade record not found"

            },

            status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):

        try:

            enrollment = Enrollment.objects.get(
                pk=pk
            )

            midterm_grade = request.data.get(
                "midterm_grade"
            )

            final_grade = request.data.get(
                "final_grade"
            )

            if midterm_grade in ["", None]:

                enrollment.midterm_grade = None

            else:

                enrollment.midterm_grade = float(
                    midterm_grade
                )

            if final_grade in ["", None]:

                enrollment.final_grade = None

            else:

                enrollment.final_grade = float(
                    final_grade
                )

            enrollment.save()

            return Response({

                "message":
                    "Grades updated successfully",

                "letter_grade":
                    enrollment.letter_grade,

                "gpa_points":
                    enrollment.gpa_points

            })

        except Enrollment.DoesNotExist:

            return Response({

                "error":
                    "Grade record not found"

            },

            status=status.HTTP_404_NOT_FOUND)

        except ValueError:

            return Response({

                "error":
                    "Grades must be numeric"

            },

            status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:

            return Response({

                "error":
                    str(e)

            },

            status=status.HTTP_400_BAD_REQUEST)