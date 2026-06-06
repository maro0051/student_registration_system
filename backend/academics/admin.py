from django.contrib import admin

from .models import (
    Department,
    Subject,
    Instructor,
    Staff,
    Semester,
    Program,
    SubjectAssignment,
    Announcement,
    Attendance,
    Assignment,
    AssignmentSubmission,
    Student,
    Course,
    Enrollment,
    Program,
    CourseOffering,
    ProgramCourse
)


admin.site.register(Department)





admin.site.register(Staff)

admin.site.register(Semester)



admin.site.register(Announcement)

admin.site.register(Attendance)

admin.site.register(Assignment)

admin.site.register(AssignmentSubmission)

admin.site.register(Student)

admin.site.register(Course)

admin.site.register(Program)
admin.site.register(CourseOffering)

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):

    list_display = (

        "student",

        "course",

        "semester",

        "midterm_grade",

        "final_grade",

        "letter_grade",

        "gpa_points"

    )