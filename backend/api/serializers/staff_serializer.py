from rest_framework import serializers

from academics.models import Staff


class StaffSerializer(
    serializers.ModelSerializer
):

    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    class Meta:

        model = Staff

        fields = [

            "id",

            "employee_id",

            "username",

            "phone_number",

            "address",

            "department",

            "profile_picture",

        ]