from academics.models import Enrollment


class EnrollmentService:

    @staticmethod
    def get_student_enrollments(
        student
    ):

        return Enrollment.objects.filter(
            student=student
        ).select_related(
            "offering",
            "offering__course"
        )