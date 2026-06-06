from django.shortcuts import redirect
from django.contrib import messages


def admin_required(view_func):

    def wrapper(request, *args, **kwargs):

        if request.user.role != "ADMIN":

            messages.error(
                request,
                "You do not have permission to access this page."
            )

            return redirect("dashboard")

        return view_func(request, *args, **kwargs)

    return wrapper