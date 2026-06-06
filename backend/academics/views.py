from datetime import date

from django.contrib import messages
from django.db.models import Avg
from django.http import HttpResponse
from django.utils.timezone import now

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import getSampleStyleSheet

from reportlab.pdfgen import canvas

from reportlab.platypus.tables import Table

from django.core.mail import send_mail
from django.shortcuts import (
    render,
    redirect,
    get_object_or_404
)

from django.contrib.auth.decorators import (
    login_required,
    user_passes_test
)
from django.contrib import messages
from django.contrib.auth.decorators import user_passes_test

from django.db.models import Count

from django.db.models import Count, Q

from django.core.paginator import Paginator


from .models import (

    Department,

    Program,

    CourseOffering,

    Subject,

    Staff,

    SubjectAssignment,

    Instructor,

    Semester,

    Announcement,

    Attendance,

    Assignment,

    AssignmentSubmission,

    Student,

    Course,

    Enrollment

)
from .forms import (

    StudentForm,

    CourseForm,

    EnrollmentForm,

    StaffForm,

    StudentProfileForm,

    StaffProfileForm,


)

from .decorators import admin_required

def is_staff_user(user):

    return user.role == "STAFF"


@login_required
def dashboard(request):

    # =========================
    # ADMIN DASHBOARD
    # =========================

    if request.user.role == "ADMIN":

        total_students = Student.objects.count()

        total_staff = Staff.objects.count()

        total_courses = Course.objects.count()

        total_enrollments = Enrollment.objects.count()

        recent_enrollments = Enrollment.objects.select_related(
            "student",
            "offering"
        ).order_by("-id")[:10]

        recent_students = Student.objects.order_by("-id")[:5]

        return render(

            request,

            "admin/dashboard.html",

            {

                "total_students": total_students,

                "total_staff": total_staff,

                "total_courses": total_courses,

                "total_enrollments": total_enrollments,

                "recent_enrollments": recent_enrollments,

                "recent_students": recent_students

            }

        )

    # =========================
    # STAFF DASHBOARD
    # =========================

    elif request.user.role == "STAFF":

        staff = Staff.objects.filter(
            user=request.user
        ).first()

        offerings = CourseOffering.objects.filter(
            instructor=staff
        )

        total_courses = offerings.count()

        total_students = Enrollment.objects.filter(
            offering__in=offerings,
            status="ENROLLED"
        ).count()

        return render(

            request,

            "staff/dashboard.html",

            {

                "staff": staff,

                "offerings": offerings,

                "total_courses": total_courses,

                "total_students": total_students

            }

        )

    # =========================
    # STUDENT DASHBOARD
    # =========================

    else:

        student = Student.objects.filter(
            user=request.user
        ).first()

        enrollments = Enrollment.objects.filter(
            student=student,
            status="ENROLLED"
        )

        offerings = CourseOffering.objects.filter(
            course__program=student.program
        )

        total_points = 0
        total_courses = 0

        for enrollment in enrollments:

            if enrollment.gpa_points:

                total_points += enrollment.gpa_points
                total_courses += 1

        cgpa = 0

        if total_courses > 0:

            cgpa = round(
                total_points / total_courses,
                2
            )

        announcements = []

        return render(

            request,

            "students/dashboard.html",

            {

                "student": student,

                "enrollments": enrollments,

                "offerings": offerings,

                "cgpa": cgpa,

                "announcements": announcements

            }

        )


# =====================================================
# STUDENTS
# =====================================================

@login_required
@admin_required
def student_list(request):

    students = Student.objects.all().order_by("-id")

    search = request.GET.get("search")

    if search:

        students = students.filter(
            user__username__icontains=search
        )

    paginator = Paginator(students, 5)

    page_number = request.GET.get("page")

    page_obj = paginator.get_page(page_number)

    return render(request, "students/list.html", {

        "page_obj": page_obj

    })


@login_required
def student_detail(request, pk):

    student = get_object_or_404(
        Student,
        pk=pk
    )

    if request.user.role == "STUDENT":

        if student.user != request.user:

            messages.error(
                request,
                "You do not have permission to access this profile."
            )

            return redirect("dashboard")

    enrollments = Enrollment.objects.filter(
        student=student,
        status="ENROLLED"
    )

    return render(request, "students/detail.html", {

        "student": student,
        "enrollments": enrollments

    })


@login_required
@admin_required
def student_create(request):

    form = StudentForm(request.POST or None)

    if form.is_valid():

        form.save()

        messages.success(
            request,
            "Student created successfully."
        )

        return redirect("student_list")

    return render(request, "students/form.html", {

        "form": form,
        "title": "Add Student"

    })


@login_required
@admin_required
def student_update(request, pk):

    student = get_object_or_404(
        Student,
        pk=pk
    )

    form = StudentForm(
        request.POST or None,
        request.FILES or None,
        instance=student
    )

    if form.is_valid():

        form.save()

        messages.success(
            request,
            "Student updated successfully."
        )

        return redirect("student_list")

    return render(request, "students/form.html", {

        "form": form,
        "title": "Edit Student"

    })


@login_required
@admin_required
def student_delete(request, pk):

    student = get_object_or_404(
        Student,
        pk=pk
    )

    if request.method == "POST":

        student.delete()

        messages.success(
            request,
            "Student deleted successfully."
        )

        return redirect("student_list")

    return render(request, "students/delete.html", {

        "student": student

    })
    @login_required
    def student_profile(request):

        student = Student.objects.filter(
            user=request.user
        ).first()

        enrollments = Enrollment.objects.filter(
            student=student,
            status="ENROLLED"
        )

        return render(request, "students/profile.html", {

            "student": student,
            "enrollments": enrollments

        })


# =====================================================
# COURSES
# =====================================================

@login_required
@admin_required
def course_list(request):

    courses = Course.objects.all().order_by("-id")

    search = request.GET.get("search")

    if search:

        courses = courses.filter(
            name__icontains=search
        )

    paginator = Paginator(courses, 5)

    page_number = request.GET.get("page")

    page_obj = paginator.get_page(page_number)

    return render(request, "courses/list.html", {

        "page_obj": page_obj

    })


@login_required
@admin_required
def course_create(request):

    form = CourseForm(request.POST or None)

    if form.is_valid():

        form.save()

        messages.success(
            request,
            "Course created successfully."
        )

        return redirect("course_list")

    return render(request, "courses/form.html", {

        "form": form,
        "title": "Add Course"

    })


@login_required
@admin_required
def course_update(request, pk):

    course = get_object_or_404(
        Course,
        pk=pk
    )

    form = CourseForm(
        request.POST or None,
        instance=course
    )

    if form.is_valid():

        form.save()

        messages.success(
            request,
            "Course updated successfully."
        )

        return redirect("course_list")

    return render(request, "courses/form.html", {

        "form": form,
        "title": "Edit Course"

    })


@login_required
@admin_required
def course_delete(request, pk):

    course = get_object_or_404(
        Course,
        pk=pk
    )

    if request.method == "POST":

        course.delete()

        messages.success(
            request,
            "Course deleted successfully."
        )

        return redirect("course_list")

    return render(request, "courses/delete.html", {

        "course": course

    })


# =====================================================
# ENROLLMENTS
# =====================================================

@login_required
def enrollment_list(request):

    if request.user.role == "ADMIN":

        enrollments = Enrollment.objects.all().order_by("-id")

    else:

        student = Student.objects.filter(
            user=request.user
        ).first()

        enrollments = Enrollment.objects.filter(
            student=student
        )

    return render(request, "enrollments/list.html", {

        "enrollments": enrollments

    })


@login_required
@admin_required
def enrollment_create(request):

    form = EnrollmentForm(request.POST or None)

    if form.is_valid():

        student = form.cleaned_data["student"]

        course = form.cleaned_data["course"]

        exists = Enrollment.objects.filter(
            student=student,
            course=course,
            status="ENROLLED"
        ).exists()

        if exists:

            messages.error(
                request,
                "Student already enrolled in this course."
            )

        else:

            form.save()

            messages.success(
                request,
                "Enrollment created successfully."
            )

            return redirect("enrollment_list")

    return render(request, "enrollments/form.html", {

        "form": form,
        "title": "Add Enrollment"

    })


@login_required
def drop_course(request, pk):

    enrollment = Enrollment.objects.filter(
        id=pk,
        student__user=request.user
    ).first()

    if not enrollment:

        messages.error(
            request,
            "Enrollment not found."
        )

        return redirect("/enrollments/")

    enrollment.status = "DROPPED"

    enrollment.save()

    messages.success(
        request,
        "Course dropped successfully."
    )

    return redirect("/enrollments/")

# =====================================================
# STUDENT SELF ENROLLMENT
# =====================================================

@login_required
def available_courses(request):

    student = Student.objects.filter(
        user=request.user
    ).first()

    if not student:

        messages.error(
            request,
            "Student profile not found."
        )

        return redirect("/")

    offerings = CourseOffering.objects.filter(
        course__program=student.program
    )

    return render(

        request,

        "courses/available_courses.html",

        {

            "student": student,

            "offerings": offerings

        }

    )
@login_required
def register_course(request, offering_id):

    student = Student.objects.get(
        user=request.user
    )

    offering = CourseOffering.objects.get(
        id=offering_id
    )

    today = now().date()

    # =========================================
    # REGISTRATION WINDOW
    # =========================================

    if today < offering.registration_open:

        messages.error(

            request,

            "Registration has not opened yet."

        )

        return redirect(
            "available_courses"
        )

    if today > offering.registration_close:

        messages.error(

            request,

            "Registration period has closed."

        )

        return redirect(
            "available_courses"
        )

    # =========================================
    # DUPLICATE REGISTRATION
    # =========================================

    already_registered = Enrollment.objects.filter(

        student=student,

        offering=offering,

        status="ENROLLED"

    ).exists()

    if already_registered:

        messages.warning(

            request,

            "Already registered for this section."

        )

        return redirect(
            "available_courses"
        )

    # =========================================
    # SEAT LIMIT
    # =========================================

    if offering.seats_remaining() <= 0:

        messages.error(

            request,

            "No seats remaining."

        )

        return redirect(
            "available_courses"
        )

    # =========================================
    # SCHEDULE CONFLICT DETECTION
    # =========================================

    existing_enrollments = Enrollment.objects.filter(

        student=student,

        status="ENROLLED"

    )

    for enrollment in existing_enrollments:

        if (

            enrollment.offering

            and

            enrollment.offering.schedule
            ==
            offering.schedule

        ):

            messages.error(

                request,

                "Schedule conflict detected."

            )

            return redirect(
                "available_courses"
            )

    # =========================================
    # CREATE ENROLLMENT
    # =========================================

    Enrollment.objects.create(

        student=student,

        course=offering.course,

        offering=offering,

        semester=offering.semester,

        status="ENROLLED"

    )

    messages.success(

        request,

        "Successfully registered."

    )

    return redirect(
        "enrollment_list"
    )

@login_required
def drop_course(request, pk):

    enrollment = Enrollment.objects.filter(
        id=pk,
        student__user=request.user
    ).first()

    if not enrollment:

        messages.error(
            request,
            "Enrollment not found."
        )

        return redirect("/enrollments/")

    if request.method == "POST":

        enrollment.status = "DROPPED"

        enrollment.save()

        messages.success(
            request,
            "Course dropped successfully."
        )

        return redirect("/enrollments/")

    return render(

        request,

        "students/drop_course.html",

        {

            "enrollment": enrollment

        }

    )

@login_required
def self_enroll(request, course_id):

    if request.user.role != "STUDENT":

        messages.error(
            request,
            "Only students can self enroll."
        )

        return redirect("dashboard")

    student = Student.objects.filter(
        user=request.user
    ).first()

    if not student:

        messages.error(
            request,
            "Student profile not found."
        )

        return redirect("dashboard")

    course = get_object_or_404(
        Course,
        id=course_id
    )

    exists = Enrollment.objects.filter(
        student=student,
        course=course,
        status="ENROLLED"
    ).exists()
    send_enrollment_email(student, course)

    if exists:

        messages.error(
            request,
            "Already enrolled in this course."
        )

        return redirect("available_courses")

    if course.enrolled_students >= course.capacity:

        messages.error(
            request,
            "Course capacity reached."
        )

        return redirect("available_courses")

    Enrollment.objects.create(
        student=student,
        course=course,
        status="ENROLLED"
    )

    messages.success(
        request,
        "Successfully enrolled in course."
    )

    return redirect("enrollment_list")

def send_enrollment_email(student, course):

    send_mail(

        subject="Course Enrollment Confirmation",

        message=f"""

Hello {student.user.username},

You have successfully enrolled in:

{course.name}

Schedule:
{course.schedule}

Instructor:
{course.instructor}

        """,

        from_email="admin@example.com",

        recipient_list=[student.user.email],

        fail_silently=True,
    )


@login_required
def student_transcript_pdf(request):

    student = Student.objects.filter(
        user=request.user
    ).first()

    if not student:

        messages.error(
            request,
            "Student profile not found."
        )

        return redirect("/")

    enrollments = Enrollment.objects.filter(
        student=student
    )

    response = HttpResponse(
        content_type="application/pdf"
    )

    response["Content-Disposition"] = (

        'attachment; filename="transcript.pdf"'

    )

    pdf = canvas.Canvas(response)

    # TITLE

    pdf.setFont("Helvetica-Bold", 18)

    pdf.drawString(
        180,
        800,
        "Official Academic Transcript"
    )

    # STUDENT INFO

    pdf.setFont("Helvetica", 12)

    pdf.drawString(
        50,
        760,
        f"Name: {student.user.username}"
    )

    pdf.drawString(
        50,
        740,
        f"Student ID: {student.student_id}"
    )

    pdf.drawString(
        50,
        720,
        f"Program: {student.program}"
    )

    # TABLE HEADERS

    y = 680

    pdf.setFont("Helvetica-Bold", 12)

    pdf.drawString(50, y, "Course")

    pdf.drawString(250, y, "Semester")

    pdf.drawString(400, y, "Grade")

    # TABLE DATA

    y -= 30

    total_points = 0
    total_courses = 0

    pdf.setFont("Helvetica", 11)

    for enrollment in enrollments:

        if not enrollment.offering:
            continue

        if not enrollment.offering.course:
            continue

        pdf.drawString(

            50,
            y,

            f"{enrollment.offering.course.code}"

        )

        pdf.drawString(

            250,
            y,

            f"{enrollment.offering.semester.name}"

        )

        grade = (

            str(enrollment.final_grade)

            if enrollment.final_grade is not None

            else "N/A"

        )

        pdf.drawString(

            400,
            y,
            grade
        )

        if enrollment.gpa_points:

            total_points += enrollment.gpa_points
            total_courses += 1

        y -= 25

    # GPA

    cgpa = 0

    if total_courses > 0:

        cgpa = round(
            total_points / total_courses,
            2
        )

    pdf.setFont("Helvetica-Bold", 12)

    pdf.drawString(
        50,
        y - 20,
        f"Cumulative GPA: {cgpa}"
    )

    pdf.save()

    return response


@login_required
def timetable_view(request):

    student = Student.objects.filter(
        user=request.user
    ).first()

    enrollments = Enrollment.objects.filter(
        student=student,
        status="ENROLLED"
    )

    return render(request, "students/timetable.html", {

        "enrollments": enrollments

    })

@login_required
def student_profile(request):

    student = Student.objects.filter(
        user=request.user
    ).first()

    if not student:

        messages.error(
            request,
            "Student profile not found."
        )

        return redirect("/")

    return render(

        request,

        "students/profile.html",

        {

            "student": student

        }

    )
@login_required
def staff_dashboard(request):

    staff = Staff.objects.filter(
        user=request.user
    ).first()

    if not staff:

        messages.error(
            request,
            "Staff profile not found."
        )

        return redirect("/")

    offerings = CourseOffering.objects.filter(
        instructor=staff
    )

    total_courses = offerings.count()

    total_students = Enrollment.objects.filter(
        offering__in=offerings,
        status="ENROLLED"
    ).count()

    return render(

        request,

        "staff/dashboard.html",

        {

            "staff": staff,

            "offerings": offerings,

            "total_courses": total_courses,

            "total_students": total_students

        }

    )
@login_required
def take_attendance(request, offering_id):

    staff = Staff.objects.filter(
        user=request.user
    ).first()

    offering = CourseOffering.objects.filter(
        id=offering_id,
        instructor=staff
    ).first()

    if not offering:

        messages.error(
            request,
            "Course not found."
        )

        return redirect("/staff-dashboard/")

    enrollments = Enrollment.objects.filter(
        offering=offering,
        status="ENROLLED"
    )

    if request.method == "POST":

        attendance_date = request.POST.get(
            "attendance_date"
        )

        for enrollment in enrollments:

            status = request.POST.get(
                f"attendance_{enrollment.id}"
            )

            Attendance.objects.update_or_create(

                enrollment=enrollment,

                date=attendance_date,

                defaults={

                    "status": status

                }

            )

        messages.success(
            request,
            "Attendance saved successfully."
        )

        return redirect(
            f"/take-attendance/{offering.id}/"
        )

    return render(

        request,

        "staff/take_attendance.html",

        {

            "offering": offering,

            "enrollments": enrollments,

            "today": date.today()

        }

    )

@login_required
def edit_student_profile(request):

    student = Student.objects.filter(
        user=request.user
    ).first()

    if not student:

        messages.error(
            request,
            "Student profile not found."
        )

        return redirect("/")

    if request.method == "POST":

        form = StudentProfileForm(

            request.POST,

            request.FILES,

            instance=student

        )

        if form.is_valid():

            form.save()

            messages.success(
                request,
                "Profile updated successfully."
            )

            return redirect("/profile/")

    else:

        form = StudentProfileForm(
            instance=student
        )

    return render(

        request,

        "students/edit_profile.html",

        {

            "form": form,

            "student": student

        }

    )



@login_required
def update_staff_profile(request):

    staff = Staff.objects.filter(
        user=request.user
    ).first()

    if not staff:

        messages.error(
            request,
            "Staff profile not found."
        )

        return redirect("/")

    if request.method == "POST":

        form = StaffProfileForm(

            request.POST,

            request.FILES,

            instance=staff

        )

        if form.is_valid():

            form.save()

            messages.success(

                request,

                "Profile updated successfully."

            )

            return redirect(
                "/staff-profile/"
            )

    else:

        form = StaffProfileForm(
            instance=staff
        )

    return render(

        request,

        "staff/update_profile.html",

        {

            "form": form,

            "staff": staff

        }

    )



@login_required
def attendance_report(request):

    student = Student.objects.get(
        user=request.user
    )

    attendance_data = []

    enrollments = Enrollment.objects.filter(
        student=student,
        status="ENROLLED"
    )

    for enrollment in enrollments:

        total_classes = Attendance.objects.filter(
            student=student,
            course=enrollment.course
        ).count()

        present_classes = Attendance.objects.filter(
            student=student,
            course=enrollment.course,
            status="PRESENT"
        ).count()

        percentage = 0

        if total_classes > 0:

            percentage = round(
                (present_classes / total_classes) * 100,
                1
            )

        attendance_data.append({

            "course": enrollment.course,

            "total_classes": total_classes,

            "present_classes": present_classes,

            "percentage": percentage,

            "warning": percentage < 75

        })

    return render(

        request,

        "students/attendance_report.html",

        {

            "attendance_data": attendance_data

        }

    )
@login_required
@user_passes_test(is_staff_user)
def grade_students(request, offering_id):

    offering = CourseOffering.objects.get(
        id=offering_id
    )

    enrollments = Enrollment.objects.filter(
        offering=offering,
        status="ENROLLED"
    )

    if request.method == "POST":

        for enrollment in enrollments:

            midterm = request.POST.get(
                f"midterm_{enrollment.id}"
            )

            final = request.POST.get(
                f"final_{enrollment.id}"
            )

            if midterm:
                enrollment.midterm_grade = float(midterm)

            if final:
                enrollment.final_grade = float(final)

            enrollment.save()

        messages.success(
            request,
            "Grades submitted successfully."
        )

        return redirect(
            "staff_dashboard"
        )

    return render(

        request,

        "staff/grade_students.html",

        {

            "offering": offering,

            "enrollments": enrollments

        }

    )
@login_required
def student_results(request):

    student = Student.objects.filter(
        user=request.user
    ).first()

    if not student:

        messages.error(
            request,
            "Student profile not found."
        )

        return redirect("/")

    enrollments = Enrollment.objects.filter(
        student=student,
        offering__isnull=False
    )

    total_points = 0
    total_courses = 0

    for enrollment in enrollments:

        if enrollment.gpa_points:

            total_points += enrollment.gpa_points
            total_courses += 1

    cgpa = 0

    if total_courses > 0:

        cgpa = round(
            total_points / total_courses,
            2
        )

    return render(

        request,

        "students/results.html",

        {

            "student": student,

            "enrollments": enrollments,

            "cgpa": cgpa

        }

    )

@login_required
def class_roster(request, offering_id):

    staff = Staff.objects.filter(
        user=request.user
    ).first()

    if not staff:

        messages.error(
            request,
            "Staff profile not found."
        )

        return redirect("/")

    offering = CourseOffering.objects.filter(
        id=offering_id,
        instructor=staff
    ).first()

    if not offering:

        messages.error(
            request,
            "Course offering not found."
        )

        return redirect("/staff-dashboard/")

    enrollments = Enrollment.objects.filter(
        offering=offering
    )

    return render(

        request,

        "staff/class_roster.html",

        {

            "offering": offering,

            "enrollments": enrollments

        }

    )
    
@login_required
def staff_profile(request):

    staff = Staff.objects.filter(
        user=request.user
    ).first()

    if not staff:

        messages.error(
            request,
            "Staff profile not found."
        )

        return redirect("/")

    return render(

        request,

        "staff/profile.html",

        {

            "staff": staff

        }

    )

