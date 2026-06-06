from rest_framework.views import APIView
from rest_framework.response import Response

from academics.models import ActivityLog


class AdminActivityLogsAPIView(
    APIView
):

    def get(self, request):

        logs = (
            ActivityLog.objects
            .order_by(
                "-created_at"
            )[:100]
        )

        data = []

        for log in logs:

            data.append({

                "id":
                    log.id,

                "action":
                    log.action,

                "performed_by":
                    log.performed_by,

                "created_at":
                    log.created_at

            })

        return Response(data)