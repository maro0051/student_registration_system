from django import forms
from .models import Staff
from .models import (
    Student,
    Course,
    Enrollment
)


class StudentForm(forms.ModelForm):

    class Meta:

        model = Student

        fields = "__all__"

        widgets = {

            "user": forms.Select(attrs={
                "class": "form-select"
            }),

            "student_id": forms.TextInput(attrs={
                "class": "form-control"
            }),

            "department": forms.Select(attrs={
                "class": "form-select"
            }),

            "phone": forms.TextInput(attrs={
                "class": "form-control"
            }),

            "address": forms.Textarea(attrs={
                "class": "form-control",
                "rows": 3
            }),

            "profile_picture": forms.ClearableFileInput(attrs={
                "class": "form-control"
            }),

            "date_of_birth": forms.DateInput(attrs={
                "class": "form-control",
                "type": "date"
            }),

            "emergency_contact": forms.TextInput(attrs={
                "class": "form-control"
            })

        }


class CourseForm(forms.ModelForm):

    class Meta:

        model = Course

        fields = "__all__"

        widgets = {


            "name": forms.TextInput(attrs={
                "class": "form-control"
            }),

            "instructor": forms.Select(attrs={
                "class": "form-select"
            }),

            "department": forms.Select(attrs={
                "class": "form-select"
            }),

            "program": forms.Select(attrs={
                "class": "form-select"
            }),

            "semester": forms.Select(attrs={
                "class": "form-select"
            }),

            "credits": forms.NumberInput(attrs={
                "class": "form-control"
            }),

            "schedule": forms.TextInput(attrs={
                "class": "form-control"
            }),

            "room": forms.TextInput(attrs={
                "class": "form-control"
            }),

            "capacity": forms.NumberInput(attrs={
                "class": "form-control"
            }),
           

        }


class EnrollmentForm(forms.ModelForm):

    class Meta:

        model = Enrollment

        fields = "__all__"

        widgets = {

            "student": forms.Select(attrs={
                "class": "form-select"
            }),

            "course": forms.Select(attrs={
                "class": "form-select"
            }),

            "semester": forms.Select(attrs={
                "class": "form-select"
            }),

            "status": forms.Select(attrs={
                "class": "form-select"
            }),

            "midterm_grade": forms.NumberInput(attrs={
                "class": "form-control"
            }),

            "final_grade": forms.NumberInput(attrs={
                "class": "form-control"
            }),

        }

class StaffForm(forms.ModelForm):

    class Meta:

        model = Staff

        fields = "__all__"

        widgets = {

            "user": forms.Select(attrs={
                "class": "form-select"
            }),

            "employee_id": forms.TextInput(attrs={
                "class": "form-control"
            }),

            "department": forms.Select(attrs={
                "class": "form-select"
            }),

            "phone": forms.TextInput(attrs={
                "class": "form-control"
            }),

            "profile_picture": forms.FileInput(attrs={
                "class": "form-control"
            }),

        }
class StudentProfileForm(forms.ModelForm):

    class Meta:

        model = Student

        fields = [

            "address",

            "phone_number",

            "profile_picture"

        ]

        widgets = {

            "address": forms.Textarea(

                attrs={

                    "class": "form-control",

                    "rows": 3,

                    "placeholder": "Enter your address"

                }

            ),

            "phone_number": forms.TextInput(

                attrs={

                    "class": "form-control",

                    "placeholder": "Enter phone number"

                }

            ),

        }



class StaffProfileForm(forms.ModelForm):

    class Meta:

        model = Staff

        fields = [

            "phone_number",

            "address",

            "profile_picture"

        ]

        widgets = {

            "phone_number": forms.TextInput(

                attrs={

                    "class": "form-control"

                }

            ),

            "address": forms.Textarea(

                attrs={

                    "class": "form-control",

                    "rows": 3

                }

            ),

            "profile_picture": forms.FileInput(

                attrs={

                    "class": "form-control"

                }

            ),

        }

