from academics.models import Enrollment


class TranscriptService:

    @staticmethod
    def build_transcript(
        student
    ):

        enrollments = Enrollment.objects.filter(
            student=student
        )

        results = []

        for enrollment in enrollments:

            results.append({

                "course_code":
                    enrollment.offering.course.code,

                "course_name":
                    enrollment.offering.course.name,

                "grade":
                    enrollment.final_grade,

                "credits":
                    enrollment.offering.course.credits

            })

        return results