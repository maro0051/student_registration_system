from rest_framework.views import APIView
from rest_framework.response import Response

from academics.models import Notification


class AdminNotificationsAPIView(
    APIView
):

    def get(self, request):

        notifications = (
            Notification.objects
            .order_by(
                "-created_at"
            )
        )

        data = []

        for notification in notifications:

            data.append({

                "id":
                    notification.id,

                "title":
                    notification.title,

                "message":
                    notification.message,

                "is_read":
                    notification.is_read,

                "created_at":
                    notification.created_at

            })

        return Response(data)

    def post(self, request):

        notification = (
            Notification.objects.create(

                title=request.data.get(
                    "title"
                ),

                message=request.data.get(
                    "message"
                )

            )
        )

        return Response({

            "message":
                "Notification created",

            "id":
                notification.id

        })