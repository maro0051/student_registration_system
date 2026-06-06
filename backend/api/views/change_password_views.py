from rest_framework.views import APIView
from rest_framework.response import Response


class ChangePasswordAPIView(
    APIView
):

    def post(
        self,
        request
    ):

        user = request.user

        current_password = request.data.get(
            "current_password"
        )

        new_password = request.data.get(
            "new_password"
        )

        if not user.check_password(
            current_password
        ):

            return Response({

                "error":
                    "Current password incorrect"

            }, status=400)

        user.set_password(
            new_password
        )

        user.save()

        return Response({

            "message":
                "Password changed"

        })