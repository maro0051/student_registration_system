import { useEffect, useState } from "react";

import api from "../../../api/axios";
import AdminLayout from "../../../layouts/AdminLayout";

function Analytics() {

    const [analytics, setAnalytics] =
        useState({

            students: 0,
            staff: 0,
            courses: 0,
            programs: 0,
            departments: 0,
            enrollments: 0,
            average_gpa: 0,
            pass_rate: 0,
            fail_rate: 0,
            passed: 0,
            failed: 0

        });

    useEffect(() => {

        loadAnalytics();

    }, []);

    const loadAnalytics = async () => {

        try {

            const response =
                await api.get(
                    "/admin/analytics/"
                );

            setAnalytics(
                response.data
            );

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <AdminLayout>

            <div className="mb-4">

                <h2 className="fw-bold">

                    📊 Analytics Dashboard

                </h2>

                <p className="text-muted">

                    Academic statistics and performance overview

                </p>

            </div>

            <div className="row g-4">

                <div className="col-md-3">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Students
                            </h6>

                            <h2 className="fw-bold">
                                {analytics.students}
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Staff
                            </h6>

                            <h2 className="fw-bold">
                                {analytics.staff}
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Courses
                            </h6>

                            <h2 className="fw-bold">
                                {analytics.courses}
                            </h2>

                        </div>

                    </div>

                </div>
                <div className="col-md-3">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Programs
                            </h6>

                            <h2 className="fw-bold">
                                {analytics.programs}
                            </h2>

                        </div>

                    </div>

                </div>
                <div className="col-md-3">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Departments
                            </h6>

                            <h2 className="fw-bold">
                                {analytics.enrollments}
                            </h2>

                        </div>

                    </div>

                </div>

            </div>

            <div className="row g-4 mt-2">

                <div className="col-md-4">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Average GPA
                            </h6>

                            <h2 className="fw-bold text-primary">
                                {analytics.average_gpa}
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Passed Students
                            </h6>

                            <h2 className="fw-bold text-success">
                                {analytics.passed}
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Failed Students
                            </h6>

                            <h2 className="fw-bold text-danger">
                                {analytics.failed}
                            </h2>

                        </div>

                    </div>

                </div>

            </div>

            <div className="card border-0 shadow-sm mt-4">

                <div className="card-body">

                    <h5 className="fw-bold mb-3">

                        📈 System Summary

                    </h5>

                    <p>

                        Total Students:
                        <strong>
                            {" "}
                            {analytics.students}
                        </strong>

                    </p>

                    <p>

                        Total Staff:
                        <strong>
                            {" "}
                            {analytics.staff}
                        </strong>

                    </p>
                    <p>

                        Total Departments:
                        <strong>
                            {" "}
                            {analytics.departments}
                        </strong>

                    </p>

                    <p>

                        Total Courses:
                        <strong>
                            {" "}
                            {analytics.courses}
                        </strong>

                    </p>

                    <p>

                        Total Enrollments:
                        <strong>
                            {" "}
                            {analytics.enrollments}
                        </strong>

                    </p>
                    <p>
                        Average GPA:
                        <strong>
                            {" "}
                            {analytics.average_gpa}
                        </strong>
                    </p>
                    <p>
                        Pass Rate:
                        <strong>
                            {" "}
                            {analytics.pass_rate}%
                        </strong>
                    </p>
                    <p>
                        Fail Rate:
                        <strong>
                            {" "}
                            {analytics.fail_rate}%
                        </strong>
                    </p>

                </div>

            </div>

        </AdminLayout>

    );

}

export default Analytics;