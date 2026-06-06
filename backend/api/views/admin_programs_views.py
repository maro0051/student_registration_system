from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from academics.models import Program


class AdminProgramsAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        programs = Program.objects.select_related(
            "department"
        )

        data = []

        for program in programs:

            data.append({

                "id": program.id,

                "name": program.name,

                "code": program.code,

                "department":
                    program.department.name,

            })

        return Response(data)

    def post(self, request):
        program = Program.objects.create(
            name=request.data.get("name"),
            code=request.data.get("code"),
            department_id=request.data.get("department")
        )
        return Response({"message": "Program created successfully"}, status=201)