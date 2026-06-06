# Student Registration & Academic Management System

## Overview

The Student Registration & Academic Management System is a full-stack web application designed to manage academic operations within a college or university environment.

The system supports three user roles:

* Administrator
* Staff (Instructor)
* Student

The application provides course management, enrollment, attendance tracking, grading, transcript generation, timetable management, and reporting features.

---

## Features

### Authentication & Authorization

* JWT Authentication
* Role-Based Access Control
* Secure Login & Logout
* Protected Routes

---

### Administrator Features

* Dashboard Analytics
* Manage Students
* Manage Staff
* Manage Departments
* Manage Programs
* Manage Courses
* Manage Semesters
* Manage Course Offerings
* Manage Enrollments
* View Academic Reports
* Academic Structure Explorer
* Generate Student Transcripts

---

### Staff Features

* Staff Dashboard
* View Profile
* Update Profile
* View Assigned Classes
* View Timetable
* Take Attendance
* View Attendance Reports
* Manage Student Grades

---

### Student Features

* Student Dashboard
* View Profile
* Update Profile
* View Timetable
* Course Registration
* View Results
* View Attendance Records
* Download Academic Transcript (PDF)

---

## Technology Stack

### Frontend

* React
* React Router
* Axios
* Bootstrap 5

### Backend

* Django
* Django REST Framework
* JWT Authentication

### Database

* SQLite (Development)
* PostgreSQL (Production Ready)

### PDF Generation

* ReportLab

---

## System Architecture

Department
→ Program
→ Course
→ Course Offering
→ Enrollment
→ Attendance
→ Grades
→ Transcript

---

## Main Modules

### Academic Management

* Departments
* Programs
* Courses
* Course Offerings
* Semesters

### Student Management

* Student Records
* Enrollment Management
* Results
* Transcript Generation

### Staff Management

* Instructor Records
* Attendance Tracking
* Grade Management

---

## Attendance Module

Staff can:

* Record attendance
* Update attendance records
* View attendance reports

Students can:

* View attendance history
* Track attendance percentage
* Monitor present and absent records

---

## Grade Management

Staff can:

* Enter Midterm Grades
* Enter Final Grades

System automatically calculates:

* Letter Grades
* GPA Points

Students can:

* View Results
* View Academic Performance

---

## Transcript Generation

Students can generate:

* Official Academic Transcript
* GPA Summary
* Course History

Export format:

* PDF

---

## Installation

### Backend

Clone the repository

```bash
git clone <repository-url>
```

Navigate to backend

```bash
cd backend
```

Create virtual environment

```bash
python -m venv venv
```

Activate virtual environment

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run migrations

```bash
python manage.py migrate
```

Start server

```bash
python manage.py runserver
```

---

### Frontend

Navigate to frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

---

## Future Enhancements

* Notification System
* Email Alerts
* Advanced Analytics Dashboard
* GPA Trend Charts
* Student Portal Enhancements
* Mobile Responsive Improvements
* Deployment on Railway and Netlify

---

## Learning Outcomes

This project demonstrates:

* Full Stack Development
* REST API Design
* Authentication & Authorization
* Database Design
* Role-Based Access Control
* State Management
* Academic Data Management
* PDF Report Generation
* React Frontend Development
* Django REST Framework Development

---

## Author

Daniel Maroy

Web Development & Internet Applications Graduate


2025 – 2026
