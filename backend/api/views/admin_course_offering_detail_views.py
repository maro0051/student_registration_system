from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from academics.models import (
    CourseOffering,
    Course,
    Staff,
    Semester
)


class AdminCourseOfferingDetailAPIView(
    APIView
):

    def get(self, request, pk):

        try:

            offering = CourseOffering.objects.get(
                pk=pk
            )

            return Response({

                "id":
                    offering.id,

                "course":
                    offering.course.id,

                "instructor":
                    offering.instructor.id,

                "semester":
                    offering.semester.id,

                "section":
                    offering.section,

                "room":
                    offering.room,

                "schedule":
                    offering.schedule,

                "capacity":
                    offering.capacity,

                "drop_deadline":
                    offering.drop_deadline,

                "registration_open":
                    offering.registration_open,

                "registration_close":
                    offering.registration_close

            })

        except CourseOffering.DoesNotExist:

            return Response({

                "error":
                    "Course offering not found"

            },

            status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):

        try:

            offering = CourseOffering.objects.get(
                pk=pk
            )

            offering.course = Course.objects.get(
                id=request.data.get(
                    "course"
                )
            )

            offering.instructor = Staff.objects.get(
                id=request.data.get(
                    "instructor"
                )
            )

            offering.semester = Semester.objects.get(
                id=request.data.get(
                    "semester"
                )
            )

            offering.section = request.data.get(
                "section"
            )

            offering.room = request.data.get(
                "room"
            )

            offering.schedule = request.data.get(
                "schedule"
            )

            offering.capacity = request.data.get(
                "capacity"
            )

            offering.drop_deadline = request.data.get(
                "drop_deadline"
            )

            offering.registration_open = request.data.get(
                "registration_open"
            )

            offering.registration_close = request.data.get(
                "registration_close"
            )

            offering.save()

            return Response({

                "message":
                    "Course offering updated successfully"

            })

        except CourseOffering.DoesNotExist:

            return Response({

                "error":
                    "Course offering not found"

            },

            status=status.HTTP_404_NOT_FOUND)

        except Course.DoesNotExist:

            return Response({

                "error":
                    "Course not found"

            },

            status=status.HTTP_400_BAD_REQUEST)

        except Staff.DoesNotExist:

            return Response({

                "error":
                    "Instructor not found"

            },

            status=status.HTTP_400_BAD_REQUEST)

        except Semester.DoesNotExist:

            return Response({

                "error":
                    "Semester not found"

            },

            status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:

            return Response({

                "error":
                    str(e)

            },

            status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):

        try:

            offering = CourseOffering.objects.get(
                pk=pk
            )

            offering.delete()

            return Response({

                "message":
                    "Course offering deleted successfully"

            })

        except CourseOffering.DoesNotExist:

            return Response({

                "error":
                    "Course offering not found"

            },

            status=status.HTTP_404_NOT_FOUND)