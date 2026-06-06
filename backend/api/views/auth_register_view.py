from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from users.models import CustomUser


class RegisterAPIView(APIView):

    permission_classes = []

    def post(self, request):

        username = request.data.get(
            "username"
        )

        password = request.data.get(
            "password"
        )

        role = request.data.get(
            "role",
            "STUDENT"
        )

        if CustomUser.objects.filter(
            username=username
        ).exists():

            return Response(

                {
                    "error":
                    "Username already exists"
                },

                status=status.HTTP_400_BAD_REQUEST

            )

        user = CustomUser.objects.create_user(

            username=username,

            password=password,

            role=role

        )

        return Response({

            "message":
                "User created",

            "user_id":
                user.id

        })