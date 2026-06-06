from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from academics.models import Semester

from api.serializers.semester_serializer import (
    SemesterSerializer
)


class AdminSemesterDetailAPIView(
    APIView
):

    def get_object(
        self,
        pk
    ):

        return Semester.objects.get(
            pk=pk
        )

    def get(
        self,
        request,
        pk
    ):

        semester = self.get_object(
            pk
        )

        serializer = (
            SemesterSerializer(
                semester
            )
        )

        return Response(
            serializer.data
        )

    def put(
        self,
        request,
        pk
    ):

        semester = self.get_object(
            pk
        )

        serializer = (
            SemesterSerializer(

                semester,

                data=request.data

            )
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                serializer.data
            )

        return Response(

            serializer.errors,

            status=status.HTTP_400_BAD_REQUEST

        )

    def delete(
        self,
        request,
        pk
    ):

        semester = self.get_object(
            pk
        )

        semester.delete()

        return Response(

            status=status.HTTP_204_NO_CONTENT

        )