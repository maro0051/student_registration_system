from django.db import models
from django.utils import timezone

from users.models import CustomUser
from django.contrib.auth import get_user_model

User = get_user_model()



# =====================================================
# DEPARTMENT
# =====================================================

class Department(models.Model):

    name = models.CharField(max_length=100)

    code = models.CharField(
        max_length=10,
        unique=True,
        null=True,
        blank=True
    )

    def __str__(self):

        return self.name

# =====================================================
# SUBJECT
# =====================================================

class Subject(models.Model):

    code = models.CharField(
        max_length=20,
        unique=True
    )

    name = models.CharField(
        max_length=200
    )

    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE
    )

    credits = models.IntegerField(
        default=3
    )

    def __str__(self):

        return f"{self.code} - {self.name}"

# =====================================================
# INSTRUCTOR
# =====================================================

class Instructor(models.Model):

    full_name = models.CharField(
        max_length=100
    )

    email = models.EmailField()

    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    def __str__(self):

        return self.full_name

# =====================================================
# STAFF PROFILE
# =====================================================

class Staff(models.Model):

    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE
    )

    employee_id = models.CharField(
        max_length=20,
        unique=True
    )

    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    phone_number = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )
    address = models.TextField(
        blank=True,
        null=True
    )

    profile_picture = models.ImageField(
        upload_to="staff_profiles/",
        null=True,
        blank=True
    )
    
    def save(self, *args, **kwargs):

        if not self.employee_id:

            last_staff = Staff.objects.order_by(
                "-id"
            ).first()

            if last_staff:

                last_id = int(
                    last_staff.employee_id[-4:]
                )

                new_id = last_id + 1

            else:

                new_id = 1

            self.employee_id = (
                f"EMP{new_id:04d}"
           )

        super().save(*args, **kwargs)



    def __str__(self):

        return self.user.username

# =====================================================
# SEMESTER
# =====================================================

class Semester(models.Model):

    name = models.CharField(
        max_length=100
    )

    start_date = models.DateField()

    end_date = models.DateField()

    is_active = models.BooleanField(
        default=False
    )
    

    def __str__(self):

        return self.name

# =====================================================
# ANNOUNCEMENT
# =====================================================

class Announcement(models.Model):

    title = models.CharField(
        max_length=200
    )

    content = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    is_active = models.BooleanField(
        default=True
    )

    def __str__(self):

        return self.title
# =====================================================
# PROGRAM
# =====================================================

class Program(models.Model):

    name = models.CharField(
        max_length=200
    )

    code = models.CharField(
        max_length=20,
        unique=True
    )

    description = models.TextField()

    duration_years = models.IntegerField(
        default=2
    )

    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return self.name


# =====================================================
# STUDENT
# =====================================================

class Student(models.Model):

    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE
    )

    student_id = models.CharField(
        max_length=20,
        unique=True
    )

    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    program = models.ForeignKey(
        Program,

        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    phone_number = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )

    address = models.TextField(
        blank=True,
        null=True
    )

    profile_number = models.CharField(
        max_length=20,
        blank=True,
        null=True

    )

    profile_picture = models.ImageField(
        upload_to="staff_profiles/",
        null=True,
        blank=True
    )
    date_of_birth = models.DateField(
        null=True,
        blank=True
    )
    emergency_contact = models.CharField(
        max_length=100,
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        null=True,
        blank=True
    )


    def save(self, *args, **kwargs):

        if not self.student_id:

            last_student = Student.objects.order_by(
                "-id"
            ).first()

            if last_student:

                last_id = int(
                    last_student.student_id[-4:]
                )

                new_id = last_id + 1

            else:

                new_id = 1

            self.student_id = (
                f"STU{timezone.now().year}"
                f"{new_id:04d}"
            )

        super().save(*args, **kwargs)



    def __str__(self):

        return self.user.username



# =====================================================
# COURSE
# =====================================================

class Course(models.Model):

    code = models.CharField(
        max_length=20,
        unique=True
    )

    name = models.CharField(
        max_length=200
    )

    instructor = models.ForeignKey(
        Instructor,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    program = models.ForeignKey(
    Program,
    on_delete=models.CASCADE,
    related_name="courses",
    null=True,
    blank=True
  )

    semester = models.ForeignKey(
        Semester,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    credits = models.IntegerField()

    schedule = models.CharField(
        max_length=200
    )

    room = models.CharField(
        max_length=50,
        default="A101"
    )

    capacity = models.IntegerField(
        default=30
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        null=True,
        blank=True
    )
    

    @property
    def enrolled_students(self):

        return Enrollment.objects.filter(
            course=self,
            status="ENROLLED"
        ).count()
        

    
    def save(self, *args, **kwargs):

        if not self.code:

            dept_code = self.department.code

            existing_courses = Course.objects.filter(
                department=self.department
            ).count()

            next_number = (
                (existing_courses + 1) * 100
            ) + 1

            self.code = (
                f"{dept_code}{next_number}"
           )

        super().save(*args, **kwargs)


    def __str__(self):

        return f"{self.code} - {self.name}"


# =====================================================
# SUBJECT ASSIGNMENT
# =====================================================

class SubjectAssignment(models.Model):

    staff = models.ForeignKey(
        Staff,
        on_delete=models.CASCADE
    )

    subject = models.ForeignKey(
        Subject,
        on_delete=models.CASCADE
    )

    semester = models.ForeignKey(
        Semester,
        on_delete=models.CASCADE
    )

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE
    )

    room = models.CharField(
        max_length=50
    )

    schedule = models.CharField(
        max_length=200
    )

    def __str__(self):

        return f"{self.staff} - {self.subject}"

# =====================================================
# PROGRAM CURRICULUM
# =====================================================

class ProgramCourse(models.Model):

    program = models.ForeignKey(
        Program,
        on_delete=models.CASCADE
    )

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE
    )

    semester_number = models.IntegerField()

    is_required = models.BooleanField(
        default=True
    )

    def __str__(self):

        return f"{self.program} - Semester {self.semester_number}"
  # =====================================================
# COURSE OFFERING
# =====================================================

class CourseOffering(models.Model):

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE
    )

    instructor = models.ForeignKey(
        Staff,
        on_delete=models.CASCADE
    )

    semester = models.ForeignKey(
        Semester,
        on_delete=models.CASCADE
    )

    section = models.CharField(
        max_length=20
    )

    room = models.CharField(
        max_length=50
    )

    schedule = models.CharField(
        max_length=200
    )

    capacity = models.IntegerField(
        default=40
    )

    drop_deadline = models.DateField()

    registration_open = models.DateField()

    registration_close = models.DateField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def seats_remaining(self):

        enrolled = Enrollment.objects.filter(
            offering=self
        ).count()

        return self.capacity - enrolled

    def __str__(self):

        return f"{self.course} - {self.section}"      
# =====================================================
# ENROLLMENT
# =====================================================

class Enrollment(models.Model):

    STATUS_CHOICES = (

        ("ENROLLED", "Enrolled"),

        ("DROPPED", "Dropped"),

        ("COMPLETED", "Completed"),

        ("WITHDRAWN","Withdrawn"),

    )

    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE
    )

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE
    )
    offering = models.ForeignKey(
        CourseOffering,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    semester = models.ForeignKey(
        Semester,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="ENROLLED"
    )

    midterm_grade = models.FloatField(
        null=True,
        blank=True
    )

    final_grade = models.FloatField(
        null=True,
        blank=True
    )

    letter_grade = models.CharField(
        max_length=2,
        blank=True
    )

    gpa_points = models.FloatField(
        default=0
    )

    enrolled_at = models.DateTimeField(
        auto_now_add=True,
        null=True,
        blank=True
    )

    def save(self, *args, **kwargs):

        self.letter_grade = ""
        self.gpa_points = 0

        if self.final_grade not in [
            None,
            "",
        ]:

            grade = float(self.final_grade)

            if grade >= 90:
                self.letter_grade = "A+"
                self.gpa_points = 4.0

            elif grade >= 85:
                self.letter_grade = "A"
                self.gpa_points = 4.0

            elif grade >= 80:
                self.letter_grade = "A-"
                self.gpa_points = 3.7

            elif grade >= 75:
                self.letter_grade = "B+"
                self.gpa_points = 3.3

            elif grade >= 70:
                self.letter_grade = "B"
                self.gpa_points = 3.0

            elif grade >= 65:
                self.letter_grade = "C+"
                self.gpa_points = 2.3

            elif grade >= 60:
                self.letter_grade = "C"
                self.gpa_points = 2.0

            elif grade >= 50:
                self.letter_grade = "D"
                self.gpa_points = 1.0

            else:
                self.letter_grade = "F"
                self.gpa_points = 0

        super().save(*args, **kwargs)

    def __str__(self):

        return f"{self.student} - {self.course}"

   
        
# ATTENDANCE
# =====================================================

class Attendance(models.Model):

    STATUS_CHOICES = (

        ("PRESENT", "Present"),

        ("ABSENT", "Absent"),

    )

    enrollment = models.ForeignKey(
        Enrollment,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    date = models.DateField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PRESENT"
    )

    def __str__(self):

        return f"{self.enrollment.student} - {self.date}"
# =====================================================
# ASSIGNMENT
# =====================================================

class Assignment(models.Model):

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE
    )

    title = models.CharField(
        max_length=200
    )

    description = models.TextField()

    due_date = models.DateField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return self.title


# =====================================================
# ASSIGNMENT SUBMISSION
# =====================================================

class AssignmentSubmission(models.Model):

    assignment = models.ForeignKey(
        Assignment,
        on_delete=models.CASCADE
    )

    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE
    )

    file = models.FileField(
        upload_to="assignments/"
    )

    submitted_at = models.DateTimeField(
        auto_now_add=True
    )

    grade = models.FloatField(
        null=True,
        blank=True
    )

    feedback = models.TextField(
        blank=True
    )

    def __str__(self):

        return f"{self.student} - {self.assignment}"

class Notification(models.Model):

    title = models.CharField(
        max_length=255
    )

    message = models.TextField()

    is_read = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return self.title

class ActivityLog(models.Model):

    action = models.CharField(
        max_length=255
    )

    performed_by = models.CharField(
        max_length=255
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return self.action