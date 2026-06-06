from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from academics.models import (
    CourseOffering,
    Course,
    Staff,
    Semester
)


class AdminCourseOfferingsAPIView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        offerings = CourseOffering.objects.select_related(
            "course",
            "instructor",
            "semester"
        )

        data = []

        for offering in offerings:

            data.append({

                "id":
                    offering.id,

                "course":
                    offering.course.name,

                "course_id":
                    offering.course.id,

                "instructor":
                    offering.instructor.user.username,

                "instructor_id":
                    offering.instructor.id,

                "semester":
                    offering.semester.name,

                "semester_id":
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
                    offering.registration_close,

                "seats_remaining":
                    offering.seats_remaining()

            })

        return Response(data)

    def post(self, request):

        try:

            course = Course.objects.get(
                id=request.data.get(
                    "course"
                )
            )

            instructor = Staff.objects.get(
                id=request.data.get(
                    "instructor"
                )
            )

            semester = Semester.objects.get(
                id=request.data.get(
                    "semester"
                )
            )

            offering = CourseOffering.objects.create(

                course=course,

                instructor=instructor,

                semester=semester,

                section=request.data.get(
                    "section"
                ),

                room=request.data.get(
                    "room"
                ),

                schedule=request.data.get(
                    "schedule"
                ),

                capacity=request.data.get(
                    "capacity",
                    40
                ),

                drop_deadline=request.data.get(
                    "drop_deadline"
                ),

                registration_open=request.data.get(
                    "registration_open"
                ),

                registration_close=request.data.get(
                    "registration_close"
                )

            )

            return Response({

                "message":
                    "Course offering created successfully",

                "id":
                    offering.id

            },

            status=status.HTTP_201_CREATED)

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