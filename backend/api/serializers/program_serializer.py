from rest_framework import serializers

from academics.models import Program


class ProgramSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = Program

        fields = "__all__"