from rest_framework.views import APIView
from rest_framework.response import Response

from academics.models import (
    Student,
    Staff,
    Course,
    Enrollment,
    Program,
    Department
)


class AdminAnalyticsAPIView(APIView):

    def get(self, request):

        students = Student.objects.count()

        staff = Staff.objects.count()

        courses = Course.objects.count()

        enrollments = Enrollment.objects.count()

        programs = Program.objects.count()

        departments = Department.objects.count()

        passed = Enrollment.objects.filter(
            final_grade__gte=50
        ).count()

        failed = Enrollment.objects.filter(
            final_grade__lt=50
        ).count()

        total_graded = passed + failed

        if total_graded > 0:

            pass_rate = round(
                (passed / total_graded) * 100,
                2
            )

            fail_rate = round(
                (failed / total_graded) * 100,
                2
            )

        else:

            pass_rate = 0

            fail_rate = 0

        graded_enrollments = Enrollment.objects.exclude(
            final_grade__isnull=True
        )

        graded_count = graded_enrollments.count()

        total_gpa = sum(

            enrollment.gpa_points or 0

            for enrollment in graded_enrollments

        )

        average_gpa = round(

            total_gpa / graded_count,

            2

        ) if graded_count > 0 else 0

        return Response({

            "students":
                students,

            "staff":
                staff,

            "courses":
                courses,

            "programs":
                programs,

            "departments":
                departments,

            "enrollments":
                enrollments,

            "average_gpa":
                average_gpa,

            "pass_rate":
                pass_rate,

            "fail_rate":
                fail_rate,

            "passed":
                passed,

            "failed":
                failed

        })