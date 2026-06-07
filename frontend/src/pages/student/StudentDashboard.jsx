import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StudentLayout from "../../layouts/StudentLayout";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell
} from "recharts";

import api from "../../api/axios";
import Sidebar from "../../components/Sidebar";

function StudentDashboard() {


const [student, setStudent] =
    useState(null);

useEffect(() => {

    loadDashboard();

}, []);

const loadDashboard = async () => {

    try {

        const response =
            await api.get(
                "/student/dashboard/"
            );

        setStudent(
            response.data
        );

    }

    catch (error) {

        console.error(error);

    }

};

if (!student) {

    return (

        <StudentLayout>

            <div className="text-center mt-5">

                <div className="spinner-border" />

            </div>

        </StudentLayout>

    );

}

return (

    <StudentLayout>

        <div className="card mb-4">
            <div className="card-body">
                <h2 className="fw-bold text-success">

                    welcome to your dashboard
                    
                    {student.student_name}
                </h2>
                <p className="text-muted mb-0">

                    Track your academic progress,
                    courses, grades, attendance,
                    timetable and transcript.
                </p>
            </div>
        </div>

        <div className="row g-3 mb-4">

            <div className="col-md-3">

                <div className="
                         card 
                         shadow-sm 
                         border-0
                         stat-card
                    "
                >

                    <div className="card-body">

                        <h6 className="text-muted">

                            🎓 Student ID

                        </h6>

                        <h4 className="fw-bold text-success">

                            {student.student_id}

                        </h4>

                    </div>

                </div>

            </div>

            <div className="col-md-3">

                <div className="card shadow-sm border-0">

                    <div className="card-body">

                        <h6 className="text-muted">

                            Program

                        </h6>

                        <h4>

                            {student.program}

                        </h4>

                    </div>

                </div>

            </div>

            <div className="col-md-3">

                <div className="card shadow-sm border-0">

                    <div className="card-body">

                        <h6 className="text-muted">

                            Department

                        </h6>

                        <h4>

                            {student.department}

                        </h4>

                    </div>

                </div>

            </div>

            <div className="col-md-3">

                <div className="card shadow-sm border-0">

                    <div className="card-body">

                        <h6 className="text-muted">

                            Total Courses

                        </h6>

                        <h4>

                            {student.total_courses}

                        </h4>

                    </div>

                </div>

            </div>

        </div>

        <div className="row g-3 mb-4">

            <div className="col-md-4">

                <div className="card border-0 shadow-sm">

                    <div className="card-body">

                        <h6 className="text-muted">

                            Completed Courses

                        </h6>

                        <h3>

                            {student.completed_courses}

                        </h3>

                    </div>

                </div>

            </div>

            <div className="col-md-4">

                <div className="card border-0 shadow-sm">

                    <div className="card-body">

                        <h6 className="text-muted">

                            Registered Courses

                        </h6>

                        <h3>

                            {student.registered_courses}

                        </h3>

                    </div>

                </div>

            </div>

            <div className="col-md-4">

                <div className="card border-0 shadow-sm">

                    <div className="card-body">

                        <h6 className="text-muted">

                            Current GPA

                        </h6>

                        <h3>

                            {student.average_gpa}

                        </h3>

                    </div>

                </div>

            </div>

        </div>

        <div className="card border-0 shadow-sm">

            <div className="card-body">

                <div className="d-flex justify-content-between">
                    <h5 className="fw-bold">

                        📚 Recent Courses

                   </h5>
                   <span
                       className="
                           badge
                           bd-success
                        "
                    >
                        {
                            student.recent_courses
                                ?.length || 0
                        }

                        Courses 
                    </span>
                </div>

                <div className="table-responsive">

                    <table className="table">

                        <thead>

                            <tr>

                                <th>Course</th>

                                <th>Status</th>

                                <th>Final Grade</th>

                                <th>Letter Grade</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                student.recent_courses
                                                                    &&
                                    student.recent_courses.length > 0

                                    ?

                                    (

                                        student.recent_courses.map(

                                            (

                                                course,
                                                index

                                            ) => (

                                                <tr
                                                    key={index}
                                                >

                                                    <td>

                                                        {
                                                            course.course
                                                        }

                                                    </td>

                                                    <td>

                                                        <span className="badge bg-primary">

                                                            {
                                                                course.status
                                                            }

                                                        </span>

                                                    </td>

                                                    <td>

                                                        {

                                                            course.final_grade ??

                                                            "-"

                                                        }

                                                    </td>

                                                    <td>

                                                        {

                                                            course.letter_grade ||

                                                            "-"

                                                        }

                                                    </td>

                                                </tr>

                                            )

                                        )

                                    )

                                    :

                                    (

                                        <tr>

                                            <td

                                                colSpan="4"

                                                className="text-center"

                                            >

                                                No courses found

                                            </td>

                                        </tr>

                                    )

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

            <div className="row mt-4">

                <div className="col-md-3">

                    <button

                        className="btn btn-primary w-100"

                        onClick={() =>

                            window.location.href =
                            "/student/profile"

                        }

                    >

                        My Profile

                    </button>

                </div>

                <div className="col-md-3">

                    <button

                        className="btn btn-success w-100"

                        onClick={() =>

                            window.location.href =
                            "/student/timetable"

                        }

                    >

                        My Timetable

                    </button>

                </div>

                <div className="col-md-3">

                    <button

                        className="btn btn-warning w-100"

                        onClick={() =>

                            window.location.href =
                            "/student/transcript"

                        }

                    >

                        My Transcript

                    </button>

                </div>

                <div className="col-md-3">

                    <button

                        className="btn btn-info w-100"

                        onClick={() =>

                            window.location.href =
                            "/student/register-course"

                        }

                    >

                        Register Course

                    </button>

                </div>

            </div>

        </StudentLayout>

    );

}

export default StudentDashboard;


