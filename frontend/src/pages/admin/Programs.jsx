import { useEffect, useState } from "react";

import api from "../../api/axios";

import AdminLayout from "../../layouts/AdminLayout";

function Programs() {

    const [programs, setPrograms] =
        useState([]);

    const [search, setSearch] =
        useState("");

    useEffect(() => {

        loadPrograms();

    }, []);

    const loadPrograms = async () => {

        try {

            const response =
                await api.get(
                    "/admin/programs/"
                );

            setPrograms(
                response.data
            );

        } catch (error) {

            console.error(error);

        }

    };

    const filteredPrograms =
        programs.filter((program) =>
            program.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    return (

        <AdminLayout>

            <div className="d-flex justify-content-between mb-3">

                <h2>
                    Programs
                </h2>

                <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Search programs..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />

            </div>

            <div className="card">

                <div className="card-body">

                    <table className="table table-striped">

                        <thead>

                            <tr>

                                <th>
                                    Code
                                </th>

                                <th>
                                    Program Name
                                </th>

                                <th>
                                    Department
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredPrograms.map(
                                (program) => (

                                <tr
                                    key={program.id}
                                >

                                    <td>
                                        {program.code}
                                    </td>

                                    <td>
                                        {program.name}
                                    </td>

                                    <td>
                                        {program.department}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </AdminLayout>

    );

}

export default Programs;