from academics.models import (
    Staff,
    CourseOffering
)


class StaffService:

    @staticmethod
    def get_staff(user):

        return Staff.objects.select_related(
            "department"
        ).get(
            user=user
        )

    @staticmethod
    def get_staff_classes(staff):

        return CourseOffering.objects.filter(
            instructor=staff
        ).select_related(
            "course",
            "semester"
        )