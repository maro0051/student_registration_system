from django.urls import path

from rest_framework_simplejwt.views import (

    TokenObtainPairView,

    TokenRefreshView,

)



from api.views import *

urlpatterns = [

    # AUTH

    path(
        "me/",
        CurrentUserAPIView.as_view(),
        name="api_me"
    ),

    # STUDENTS

    path(
        "students/",
        StudentListAPIView.as_view(),
        name="api_students"
    ),

    # STAFF

    path(
        "staff/",
        StaffListAPIView.as_view(),
        name="api_staff"
    ),

    # COURSES

    path(
        "courses/",
        CourseListAPIView.as_view(),
        name="api_courses"
    ),

    # ENROLLMENTS

    path(
        "enrollments/",
        EnrollmentListAPIView.as_view(),
        name="api_enrollments"
    ),

    # ADMIN

    path(
        "admin/dashboard/",
        AdminDashboardAPIView.as_view(),
        name="api_admin_dashboard"
    ),

    # STUDENT

    path(
    "student/dashboard/",
    StudentDashboardAPIView.as_view(),
    name="student_dashboard_api"
    ),

    path(
        "student/profile/",
        StudentProfileAPIView.as_view(),
        name="student_profile_api"
    ),
  
    
    path(
        "student/profile/update/",
        StudentProfileUpdateAPIView.as_view(),
        
    ),

    path(
        "student/timetable/",
        StudentTimetableAPIView.as_view(),
        name="student_timetable_api"
    ),

    path(
        "student/transcript/",
        StudentTranscriptAPIView.as_view(),
        name="student_transcript_api"
    ),
    path(
        "student/results/",
        StudentResultsAPIView.as_view(),
    ),

    path(
        "student/available-courses/",
        StudentAvailableCoursesAPIView.as_view(),
    ),
    path(
        "student/register-course/<int:offering_id>/",
        StudentRegisterCourseAPIView.as_view(),
    ),
    path(
        "student/attendance/",
        StudentAttendanceAPIView.as_view()
),

# STAFF

    path(
        "staff/profile/",
        StaffProfileAPIView.as_view(),
        
    ),
    path(
        "staff/profile/update/",
        StaffUpdateProfileAPIView.as_view()
    ),

    
    path(
        "staff/dashboard/",
        StaffDashboardAPIView.as_view()
    ),

    path(
        "staff/classes/",
        StaffClassesAPIView.as_view(),
        name="staff_classes_api"
    ),

    path(
        "staff/attendance/<int:offering_id>/",
        StaffAttendanceAPIView.as_view(),
        
    ),
    path(
       "staff/attendance-report/<int:offering_id>/",
       StaffAttendanceReportAPIView.as_view(),
    ),
    

    path(
        "staff/grades/<int:offering_id>/",
        StaffGradesAPIView.as_view(),
        
    ),
    path(
        "staff/timetable/",
        StaffTimetableAPIView.as_view(),
    ),


    #ADMIN
    path(
        "admin/courses/",
        AdminCoursesAPIView.as_view()
    ),
    path(
        "admin/courses/<int:pk>/",
        AdminCourseDetailAPIView.as_view()
    ),
    path(
        "admin/courses/<int:pk>/",
        AdminCourseDetailAPIView.as_view()
    ),
    path(
        "admin/enrollments/",
        AdminEnrollmentsAPIView.as_view()
    ),
    path(
        "admin/enrollments/<int:pk>/",
        AdminEnrollmentDetailAPIView.as_view()
    ),
    path(
        "admin/editenrollment/<int:pk>/",
        AdminEnrollmentDetailAPIView.as_view()
    ),
    path(
        "admin/createenrollment/",
        AdminEnrollmentDetailAPIView.as_view()
    ),
    path(
        "admin/students/",
        AdminStudentsAPIView.as_view()
    ),
    path(
        "admin/students/<int:pk>/",
        AdminStudentDetailAPIView.as_view()
    ),
    path(
        "admin/editstudent/<int:pk>/",
        AdminStudentDetailAPIView.as_view()
    ),
    path(
        "student/transcript/pdf/",
        StudentTranscriptPDFAPIView.as_view(),
        name="student_transcript_pdf"
    ),
    path(
        "admin/createstudent/",
        AdminStudentDetailAPIView.as_view()
    ),
    path(
        "admin/staff/",
        AdminStaffAPIView.as_view()
    ),
    path(
         "admin/createstaff/",
         AdminStaffDetailAPIView.as_view()
    ),
    path(
        "admin/staff/<int:pk>/",
        AdminStaffDetailAPIView.as_view()
    ),
    path(
        "admin/editstaff/<int:pk>/",
        AdminStaffDetailAPIView.as_view()
        
    ),
    path(
        "admin/programs/",
        AdminProgramsAPIView.as_view()
    ),
    path(
        "admin/programs/<int:pk>/", 
        AdminProgramDetailAPIView.as_view()
    ),
    path(
        "admin/editprogram/<int:pk>/",
        AdminProgramDetailAPIView.as_view()
    ),
    path(
        "admin/createprogram/",
        AdminProgramDetailAPIView.as_view()
    ),
    path(
        "admin/semesters/",
        AdminSemestersAPIView.as_view()
    ),
    path(
        "admin/semesters/<int:pk>/",
        AdminSemesterDetailAPIView.as_view()

    ),
    path(
        "admin/departments/",
        AdminDepartmentsAPIView.as_view()   

    ),
    path(
        "admin/departments/<int:pk>/",
        AdminDepartmentDetailAPIView.as_view()
    ),
    path(
        "admin/course-offerings/",
        AdminCourseOfferingsAPIView.as_view()
    ),
    path(
        "admin/course-offerings/<int:pk>/",
        AdminCourseOfferingDetailAPIView.as_view()
    ),
    path(
        "admin/grades/",
         AdminGradesAPIView.as_view()
    ),

    path(
        "admin/grades/<int:pk>/",
        AdminGradeDetailAPIView.as_view()
    ),


    path(
        "token/",
        TokenObtainPairView.as_view(),
        name="token_obtain_pair"
    ),
    path(
        "token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh"
    ),
    path(
        "auth/login/",
        LoginAPIView.as_view()
    ),
    path(
        "auth/register/",
        RegisterAPIView.as_view()
    ),
    path(
        "auth/logout/",
        LogoutAPIView.as_view()
    ),
    path(
        "profile/",
        ProfileUpdateAPIView.as_view()
    ),
    path(
    "change-password/",
    ChangePasswordAPIView.as_view()
),
path(
    "admin/analytics/",
    AdminAnalyticsAPIView.as_view()
),
path(
    "admin/analytics/enrollments/",
    AdminEnrollmentAnalyticsAPIView.as_view()
),
path(
    "admin/transcript/pdf/<int:student_id>/",
    generate_transcript_pdf
),
path(
    "admin/notifications/",
    AdminNotificationsAPIView.as_view()
),
path(
    "admin/notifications/<int:pk>/",
    AdminNotificationDetailAPIView.as_view()
),

path(
    "admin/reports/",
    AdminReportsAPIView.as_view()
),
path(
    "admin/reports/export/",
    AdminReportExportAPIView.as_view()
),
path(
    "admin/reports/enrollments/pdf/",
    AdminReportPDFAPIView.as_view(),
    
),
path(
    "admin/activity_logs/",
    AdminActivityLogsAPIView.as_view()
),

#PROGRAM
path(
    "departments/<int:department_id>/programs/",
    DepartmentProgramsAPIView.as_view()
),

path(
    "programs/<int:program_id>/courses/",
    ProgramCoursesAPIView.as_view()
),





]