from rest_framework import serializers

from academics.models import Student


class StudentSerializer(
    serializers.ModelSerializer
):

    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    class Meta:

        model = Student

        fields = [

            "id",

            "student_id",

            "username",

            "phone_number",

            "address",

            "program",

            "department",

            "profile_picture",

        ]