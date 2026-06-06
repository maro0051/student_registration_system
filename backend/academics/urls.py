from django.urls import path

from .views import *

urlpatterns = [

    path("", dashboard, name="dashboard"),

    # STUDENTS
    path(
        "students/",
        student_list,
        name="student_list"
    ),

    path(
        "students/<int:pk>/",
        student_detail,
        name="student_detail"
    
        
    ),

    path(
        "students/create/",
        student_create,
        name="student_create"
    ),

    path(
        "students/<int:pk>/edit/",
        student_update,
        name="student_update"
    ),

    path(
        "students/<int:pk>/delete/",
        student_delete,
        name="student_delete"
    ),

    # COURSES
    path(
        "courses/",
        course_list,
        name="course_list"
    ),

    path(
        "courses/create/",
        course_create,
        name="course_create"
    ),

    path(
        "courses/<int:pk>/edit/",
        course_update,
        name="course_update"
    ),

    path(
        "courses/<int:pk>/delete/",
        course_delete,
        name="course_delete"
    ),

    # ENROLLMENTS
    path(
        "enrollments/",
        enrollment_list,
        name="enrollment_list"
    ),

    path(
        "enrollments/create/",
        enrollment_create,
        name="enrollment_create"
    ),

    path(
        "enrollments/<int:pk>/drop/",
        drop_course,
        name="drop_course"
    ),

    # STUDENT SELF ENROLLMENT
    path(
        "available-courses/",
        available_courses,
        name="available_courses"
    ),

    path(
        "self-enroll/<int:course_id>/",
        self_enroll,
        name="self_enroll"
    ),

    # PDF + TIMETABLE
    path(
        "transcript-pdf/",
        student_transcript_pdf,
        name="student_transcript_pdf"
    ),

    path(
        "timetable/",
        timetable_view,
        name="timetable_view"
    ),
    path(
        "profile/",
        student_profile,
        name="student_profile"
    ),
    path(
        "staff-dashboard/",
        staff_dashboard,
        name="staff_dashboard"
    ),
    path(
        "take-attendance/<int:offering_id>/",
        take_attendance,
        name="take_attendance"
    ),
    path(
        "edit-profile/",
        edit_student_profile,
        name="edit_student_profile"
    ),
    path(
        "update-staff-profile/",
        update_staff_profile,
        name="update_staff_profile"
    ),
    path(
        "attendance-report/",
        attendance_report,
        name="attendance_report"
    ),
    path(
        "grade-students/<int:offering_id>/",
        grade_students,
        name="grade_students"
    ),

    path(
        "results/",
        student_results,
        name="student_results"
    ),
    path(
        "register-course/<int:offering_id>/",
        register_course,
        name="register_course"
    ),
 
    
    path(
        "class-roster/<int:offering_id>/",
        class_roster,
        name="class_roster"
    ),
    path(
        "staff-profile/",
        staff_profile,
        name="staff_profile"
    ),
]