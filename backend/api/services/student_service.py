from academics.models import Student


class StudentService:

    @staticmethod
    def get_student(user):

        return Student.objects.select_related(
            "program",
            "department"
        ).get(
            user=user
        )