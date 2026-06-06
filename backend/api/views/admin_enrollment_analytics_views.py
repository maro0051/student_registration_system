from rest_framework.views import APIView
from rest_framework.response import Response

from academics.models import Enrollment


class AdminEnrollmentAnalyticsAPIView(APIView):

    def get(self, request):

        total_enrollments = Enrollment.objects.count()

        enrolled = Enrollment.objects.filter(
            status="ENROLLED"
        ).count()

        completed = Enrollment.objects.filter(
            status="COMPLETED"
        ).count()

        dropped = Enrollment.objects.filter(
            status="DROPPED"
        ).count()

        withdrawn = Enrollment.objects.filter(
            status="WITHDRAWN"
        ).count()

        passed = Enrollment.objects.filter(
            final_grade__gte=50
        ).count()

        failed = Enrollment.objects.filter(
            final_grade__lt=50
        ).count()

        average_grade = 0

        graded = Enrollment.objects.exclude(
            final_grade=None
        )

        if graded.exists():

            total = sum(

                enrollment.final_grade

                for enrollment in graded

                if enrollment.final_grade is not None

            )

            average_grade = round(

                total / graded.count(),

                2

            )

        return Response({

            "total_enrollments":
                total_enrollments,

            "enrolled":
                enrolled,

            "completed":
                completed,

            "dropped":
                dropped,

            "withdrawn":
                withdrawn,

            "passed":
                passed,

            "failed":
                failed,

            "average_grade":
                average_grade

        })