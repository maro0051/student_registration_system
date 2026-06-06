import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";

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

function Dashboard() {

    const [dashboard, setDashboard] =
        useState({

            students: 0,
            staff: 0,
            courses: 0,
            enrollments: 0
            

        });

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const response =
                await api.get(
                    "/admin/dashboard/"
                );

            setDashboard(
                response.data
            );

        } catch (error) {

            console.error(error);

        }

    };

    const enrollmentData = [

        {
            month: "Jan",
            enrollments: 45
        },

        {
            month: "Feb",
            enrollments: 60
        },

        {
            month: "Mar",
            enrollments: 75
        },

        {
            month: "Apr",
            enrollments: 90
        },

        {
            month: "May",
            enrollments: 120
        }

    ];

    const departmentData = [

        {
            name: "IT",
            value: 35
        },

        {
            name: "Business",
            value: 25
        },

        {
            name: "Engineering",
            value: 20
        },

        {
            name: "Science",
            value: 20
        }

    ];

    const COLORS = [

        "#4F46E5",
        "#22C55E",
        "#F59E0B",
        "#EF4444"

    ];

    return (

        <div className="d-flex bg-light">

            <Sidebar />

            <div
                className="container-fluid p-4"
                style={{
                    marginLeft: "280px"
                }}
            >

                <div className="alert alert-primary border-0 shadow-sm rounded-4 mb-4">

                    <strong>
                        School Management ERP
                    </strong>

                    {" "}
                    • Built with React,
                    Django REST Framework,
                    JWT Authentication,
                    MySQL and Bootstrap 5

                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div className="card admin-stat-card">

                        <h2 className="admin-title">
                            Welcome Back 👋
                        </h2>

                        <p className="text-muted">
                            Student Registration System Dashboard
                        </p>

                    </div>

                    <button
                        className="btn btn-outline-primary"
                    >
                        🔔 Notifications
                    </button>

                </div>

                <div className="row">

                    <div className="col-lg-3 mb-4">

                        <div className="card border-0 shadow rounded-4">

                            <div className="card-body">

                                <h6 className="admin-title">
                                    Students
                                </h6>

                                <h2 className="fw-bold">
                                    {dashboard.students}
                                </h2>

                                <small className="text-success">
                                    +12% Growth
                                </small>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-3 mb-4">

                        <div className="card border-0 shadow rounded-4">

                            <div className="card-body">

                                <h6 className="text-muted">
                                    Staff
                                </h6>

                                <h2 className="fw-bold">
                                    {dashboard.staff}
                                </h2>

                                <small className="text-primary">
                                    Active Users
                                </small>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-3 mb-4">

                        <div className="card border-0 shadow rounded-4">

                            <div className="card-body">

                                <h6 className="text-muted">
                                    Courses
                                </h6>

                                <h2 className="fw-bold">
                                    {dashboard.courses}
                                </h2>

                                <small className="text-warning">
                                    Available
                                </small>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-3 mb-4">

                        <div className="card border-0 shadow rounded-4">

                            <div className="card-body">

                                <h6 className="text-muted">
                                    Enrollments
                                </h6>

                                <h2 className="fw-bold">
                                    {dashboard.enrollments}
                                </h2>

                                <small className="text-success">
                                    Registered
                                </small>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="card border-0 shadow rounded-4 mb-4">

                    <div className="card-body">

                        <h4 className="mb-3">
                            Quick Actions
                        </h4>

                        <div className="d-flex gap-3 flex-wrap">

                            <Link
                                to="/admin/students/create"
                                className="btn btn-primary"
                            >
                                Add Student
                            </Link>

                            <Link
                                to="/admin/staff/create"
                                className="btn btn-success"
                            >
                                Add Staff
                            </Link>

                            <Link
                                to="/admin/courses/create"
                                className="btn btn-warning"
                            >
                                Add Course
                            </Link>

                            <Link
                                to="/admin/programs/create"
                                className="btn btn-info text-white"
                            >
                                Add Program
                            </Link>

                        </div>

                    </div>

                </div>

                <div className="row mb-4">

                    <div className="col-lg-8">

                        <div className="card border-0 shadow rounded-4">

                            <div className="card-body">

                                <h4 className="mb-3">
                                    Enrollment Trends
                                </h4>

                                <ResponsiveContainer
                                    width="100%"
                                    height={300}
                                >

                                    <BarChart
                                        data={enrollmentData}
                                    >

                                        <XAxis
                                            dataKey="month"
                                        />

                                        <YAxis />

                                        <Tooltip />

                                        <Bar
                                            dataKey="enrollments"
                                            fill="#4F46E5"
                                        />

                                    </BarChart>

                                </ResponsiveContainer>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-4">

                        <div className="card border-0 shadow rounded-4">

                            <div className="card-body">

                                <h4 className="mb-3">
                                    Department Distribution
                                </h4>

                                <ResponsiveContainer
                                    width="100%"
                                    height={300}
                                >

                                    <PieChart>

                                        <Pie

                                            data={departmentData}

                                            dataKey="value"

                                            nameKey="name"

                                            outerRadius={90}

                                        >

                                            {departmentData.map(

                                                (
                                                    entry,
                                                    index
                                                ) => (

                                                    <Cell

                                                        key={index}

                                                        fill={
                                                            COLORS[index]
                                                        }

                                                    />

                                                )

                                            )}

                                        </Pie>

                                        <Tooltip />

                                    </PieChart>

                                </ResponsiveContainer>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="row">

                    <div className="col-lg-8">

                        <div className="card border-0 shadow rounded-4">

                            <div className="card-body">

                                <h4>
                                    Recent Activities
                                </h4>

                                <hr />

                                <p>
                                    ✅ New Student Registered
                                </p>

                                <p>
                                    ✅ Enrollment Approved
                                </p>

                                <p>
                                    ✅ Grade Submitted
                                </p>

                                <p>
                                    ✅ New Course Created
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-4">

                        <div className="card border-0 shadow rounded-4">

                            <div className="card-body">

                                <h4>
                                    System Status
                                </h4>

                                <hr />

                                <p>
                                    🟢 Backend Online
                                </p>

                                <p>
                                    🟢 Database Connected
                                </p>

                                <p>
                                    🟢 Authentication Active
                                </p>

                                <p>
                                    🟢 API Running
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;