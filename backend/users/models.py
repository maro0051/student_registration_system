from django.contrib.auth.models import AbstractUser

from django.db import models


class CustomUser(AbstractUser):

    ROLE_CHOICES = (

        ("ADMIN", "Admin"),

        ("STAFF", "Staff"),

        ("STUDENT", "Student"),

    )

    role = models.CharField(

        max_length=20,

        choices=ROLE_CHOICES,

        default="STUDENT"

    )

    def __str__(self):

        return self.username