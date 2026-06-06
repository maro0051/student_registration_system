from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from academics.models import Notification


class AdminNotificationDetailAPIView(
    APIView
):

    def get(self, request, pk):

        try:

            notification = (
                Notification.objects.get(
                    pk=pk
                )
            )

            return Response({

                "id":
                    notification.id,

                "title":
                    notification.title,

                "message":
                    notification.message,

                "is_read":
                    notification.is_read

            })

        except Notification.DoesNotExist:

            return Response({

                "error":
                    "Notification not found"

            },

            status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):

        notification = (
            Notification.objects.get(
                pk=pk
            )
        )

        notification.title = request.data.get(
            "title",
            notification.title
        )

        notification.message = request.data.get(
            "message",
            notification.message
        )

        notification.is_read = request.data.get(
            "is_read",
            notification.is_read
        )

        notification.save()

        return Response({

            "message":
                "Notification updated"

        })

    def delete(self, request, pk):

        notification = (
            Notification.objects.get(
                pk=pk
            )
        )

        notification.delete()

        return Response({

            "message":
                "Notification deleted"

        })