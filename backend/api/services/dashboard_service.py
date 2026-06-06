from academics.models import CourseOffering
from academics.models import (
    Student,
    Staff,
    Course,
    CourseOffering,
    Enrollment,
    Program,
    Department
)


class DashboardService:

    @staticmethod
    def admin_dashboard():

        return {

            "students":
                Student.objects.count(),

            "staff":
                Staff.objects.count(),

            "courses":
                Course.objects.count(),

            "enrollments":
                Enrollment.objects.count(),

            "programs":
                Program.objects.count(),

            "departments":
                Department.objects.count(),

        }

    @staticmethod
    def student_dashboard(
        student,
        user
    ):

        enrollments = Enrollment.objects.filter(
            student=student
        )

        return {

            "student_name":
                user.username,

            "student_id":
                student.student_id,

            "program":
                student.program.name,

            "department":
                student.department.name,

            "total_courses":
                enrollments.count(),

        }

    @staticmethod
    def staff_dashboard(
        staff,
        user
    ):

        offerings = CourseOffering.objects.filter(
            instructor=staff
        )

        return {

            "employee_id":
                staff.employee_id,

            "name":
                user.get_full_name()
                or user.username,

            "department":
                staff.department.name,

            "total_classes":
                offerings.count(),

        }