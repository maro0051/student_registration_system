import { useEffect, useState } from "react";

import api from "../../api/axios";

import AdminLayout from "../../layouts/AdminLayout";

function CourseExplorer() {

    const [departments, setDepartments] =
        useState([]);

    const [programs, setPrograms] =
        useState([]);

    const [courses, setCourses] =
        useState([]);

    const [departmentId, setDepartmentId] =
        useState("");

    const [programId, setProgramId] =
        useState("");

    useEffect(() => {

        loadDepartments();

    }, []);

    const loadDepartments = async () => {

        try {

            const response =
                await api.get(
                    "/admin/departments/"
                );

            setDepartments(
                response.data
            );

        }

        catch (error) {

            console.error(error);

        }

    };

    const loadPrograms = async (
        id
    ) => {

        try {

            const response =
                await api.get(

                    `/departments/${id}/programs/`

                );

            setPrograms(
                response.data
            );

            setCourses([]);

        }

        catch (error) {

            console.error(error);

        }

    };

    const loadCourses = async (
        id
    ) => {

        try {

            const response =
                await api.get(

                    `/programs/${id}/courses/`

                );

            setCourses(
                response.data
            );

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <AdminLayout>

            <div className="container-fluid">

                <div className="card shadow-sm">

                    <div className="card-header">

                        <h3 className="mb-0">

                            🎯 Academic Structure

                        </h3>

                    </div>

                    <div className="card-body">

                        <div className="row mb-4">

                            <div className="col-md-6">

                                <label className="form-label">

                                    Department

                                </label>

                                <select

                                    className="form-select"

                                    value={
                                        departmentId
                                    }

                                    onChange={

                                        e => {

                                            setDepartmentId(

                                                e.target.value

                                            );

                                            setProgramId("");

                                            loadPrograms(

                                                e.target.value

                                            );

                                        }

                                    }

                                >

                                    <option value="">

                                        Select Department

                                    </option>

                                    {

                                        departments.map(

                                            department => (

                                                <option

                                                    key={
                                                        department.id
                                                    }

                                                    value={
                                                        department.id
                                                    }

                                                >

                                                    {
                                                        department.name
                                                    }

                                                </option>

                                            )

                                        )

                                    }

                                </select>

                            </div>

                            <div className="col-md-6">

                                <label className="form-label">

                                    Program

                                </label>

                                <select

                                    className="form-select"

                                    value={
                                        programId
                                    }

                                    onChange={

                                        e => {

                                            setProgramId(

                                                e.target.value

                                            );

                                            loadCourses(

                                                e.target.value

                                            );

                                        }

                                    }

                                >

                                    <option value="">

                                        Select Program

                                    </option>

                                    {

                                        programs.map(

                                            program => (

                                                <option

                                                    key={
                                                        program.id
                                                    }

                                                    value={
                                                        program.id
                                                    }

                                                >

                                                    {
                                                        program.name
                                                    }

                                                </option>

                                            )

                                        )

                                    }

                                </select>

                            </div>

                        </div>

                        <div className="table-responsive">

                            <table className="table table-hover">

                                <thead>

                                    <tr>

                                        <th>

                                            Code

                                        </th>

                                        <th>

                                            Course

                                        </th>

                                        <th>

                                            Credits

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        courses.length > 0

                                        ?

                                        (

                                            courses.map(

                                                course => (

                                                    <tr

                                                        key={
                                                            course.id
                                                        }

                                                    >

                                                        <td>

                                                            {
                                                                course.code
                                                            }

                                                        </td>

                                                        <td>

                                                            {
                                                                course.name
                                                            }

                                                        </td>

                                                        <td>

                                                            {
                                                                course.credits
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

                                                    colSpan="3"

                                                    className="text-center"

                                                >

                                                    Select a program to view courses

                                                </td>

                                            </tr>

                                        )

                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>
                    <div className="mt-4 d-flex justify-content-end gap-2 flex-wrap">

                   <button

                       className="btn btn-danger"

                       onClick={() =>
                           navigate(-1)
                        }

                    >

                      ← Back

                    </button>

                </div>

                </div>

            </div>

        </AdminLayout>

    );

}

export default CourseExplorer;