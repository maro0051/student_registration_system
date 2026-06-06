from rest_framework import serializers

from academics.models import Semester


class SemesterSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = Semester

        fields = "__all__"