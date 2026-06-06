from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib.auth.views import LoginView, LogoutView

from .forms import RegisterForm


class UserLoginView(LoginView):

    template_name = "registration/login.html"


class UserLogoutView(LogoutView):
    pass


def register_view(request):

    if request.method == "POST":

        form = RegisterForm(request.POST)

        if form.is_valid():

            user = form.save(commit=False)

            user.role = "STUDENT"

            user.save()

            login(request, user)

            return redirect("dashboard")

    else:

        form = RegisterForm()

    return render(request, "registration/register.html", {

        "form": form

    })