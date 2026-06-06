from rest_framework.views import APIView
from rest_framework.response import Response

from django.utils import timezone
from datetime import timedelta

from academics.models import (
    Student,
    Staff,
    Course,
    Enrollment
)


class AdminDashboardAPIView(APIView):

    def get(self, request):

        students = Student.objects.count()

        staff = Staff.objects.count()

        courses = Course.objects.count()

        enrollments = Enrollment.objects.count()

        today = timezone.now()

        current_month_enrollments = Enrollment.objects.filter(

            enrolled_at__year=today.year,

            enrolled_at__month=today.month

        ).count()

        previous_month_date = (
            today - timedelta(days=30)
        )

        previous_month_enrollments = Enrollment.objects.filter(

            enrolled_at__year=
                previous_month_date.year,

            enrolled_at__month=
                previous_month_date.month

        ).count()

        enrollment_trend = 0

        if previous_month_enrollments > 0:

            enrollment_trend = round(

                (

                    (

                        current_month_enrollments

                        -

                        previous_month_enrollments

                    )

                    /

                    previous_month_enrollments

                )

                * 100,

                1

            )

        recent_enrollments = Enrollment.objects.select_related(

            "student",

            "student__user",

            "course"

        ).order_by(

            "-enrolled_at"

        )[:5]

        recent_data = []

        for enrollment in recent_enrollments:

            recent_data.append({

                "id":
                    enrollment.id,

                "student":
                    enrollment.student.user.username
                    if enrollment.student
                    and enrollment.student.user
                    else "Unknown",

                "course":
                    enrollment.course.name
                    if enrollment.course
                    else "Unknown",

                "status":
                    enrollment.status

            })

        return Response({

            "students":
                students,

            "staff":
                staff,

            "courses":
                courses,

            "enrollments":
                enrollments,

            "current_month_enrollments":
                current_month_enrollments,

            "previous_month_enrollments":
                previous_month_enrollments,

            "enrollment_trend":
                enrollment_trend,

            "recent_enrollments":
                recent_data

        })