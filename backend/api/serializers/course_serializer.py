from rest_framework import serializers

from academics.models import Course


class CourseSerializer(
    serializers.ModelSerializer
):

    department_name = serializers.CharField(
        source="department.name",
        read_only=True
    )

    program_name = serializers.CharField(
        source="program.name",
        read_only=True
    )

    class Meta:

        model = Course

        fields = [

            "id",

            "code",

            "name",

            "credits",

            "department",

            "department_name",

            "program",

            "program_name",

        ]