from rest_framework.views import APIView
from rest_framework.response import Response

from api.permissions import IsStudent

from academics.models import Student


class StudentProfileAPIView(
    APIView
):

    permission_classes = [
        IsStudent
    ]

    def get(
        self,
        request
    ):

        student = Student.objects.get(
            user=request.user
        )

        return Response({

            "student_id":
                student.student_id,

            "username":
                request.user.username,

            "email":
                request.user.email,

            "phone_number":
                student.phone_number,

            "address":
                student.address,

            "program":
                student.program.name
                if student.program
                else "Not Assigned",

            "department":
                student.department.name
                if student.department
                else "Not Assigned",

            "date_of_birth":
                student.date_of_birth,

            "emergency_contact":
                student.emergency_contact,

            "profile_picture":
                student.profile_picture.url
                if student.profile_picture
                else None

        })