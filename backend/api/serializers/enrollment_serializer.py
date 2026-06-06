from rest_framework import serializers

from academics.models import Enrollment


class EnrollmentSerializer(
    serializers.ModelSerializer
):

    student_name = serializers.CharField(
        source="student.user.username",
        read_only=True
    )

    course_code = serializers.CharField(
        source="offering.course.code",
        read_only=True
    )

    course_name = serializers.CharField(
        source="offering.course.name",
        read_only=True
    )

    class Meta:

        model = Enrollment

        fields = [

            "id",

            "student",

            "student_name",

            "offering",

            "course_code",

            "course_name",

            "status",

            "final_grade",

        ]