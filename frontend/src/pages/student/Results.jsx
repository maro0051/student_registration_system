import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";
import StudentLayout from "../../layouts/StudentLayout";

function Results() {


const navigate =
    useNavigate();

const [results, setResults] =
    useState([]);

const [averageGPA, setAverageGPA] =
    useState(0);

const [loading, setLoading] =
    useState(true);

const [search, setSearch] =
    useState("");

useEffect(() => {

    loadResults();

}, []);

const loadResults = async () => {

    try {

        const response =
            await api.get(
                "/student/results/"
            );

        setResults(
            response.data.results
        );

        setAverageGPA(
            response.data.average_gpa
        );

    }

    catch (error) {

        console.error(error);

    }

    finally {

        setLoading(false);

    }

};

const filteredResults =
    results.filter(

        result =>

            result.course
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )

    );

return (

    <StudentLayout>

        <div className="d-flex align-items-center mb-4">

            <button

                className="btn btn-secondary me-3"

                onClick={() =>
                    navigate(-1)
                }

            >

                ← Back

            </button>

            <h2 className="mb-0">

                My Results

            </h2>

        </div>

        <div className="row mb-4">

            <div className="col-md-4">

                <div className="card border-0 shadow-sm">

                    <div className="card-body text-center">

                        <h6 className="text-muted">

                            Current GPA

                        </h6>

                        <h2>

                            {averageGPA}

                        </h2>

                    </div>

                </div>

            </div>

        </div>

        <div className="card border-0 shadow-sm">

            <div className="card-body">

                <div className="row mb-3">

                    <div className="col-md-4">

                        <input

                            type="text"

                            className="form-control"

                            placeholder="Search course..."

                            value={search}

                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }

                        />

                    </div>

                </div>

                {

                    loading

                    ?

                    (

                        <div className="text-center">

                            <div className="spinner-border" />

                        </div>

                    )

                    :

                    (

                        <div className="table-responsive">

                            <table className="table table-hover">

                                <thead>

                                    <tr>

                                        <th>

                                            Course

                                        </th>

                                        <th>

                                            Midterm

                                        </th>

                                        <th>

                                            Final

                                        </th>

                                        <th>

                                            Letter Grade

                                        </th>

                                        <th>

                                            GPA Points

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        filteredResults.length === 0

                                        ?

                                        (

                                            <tr>

                                                <td

                                                    colSpan="5"

                                                    className="text-center"

                                                >

                                                    No results found

                                                </td>

                                            </tr>

                                        )

                                        :

                                        (

                                            filteredResults.map(

                                                (

                                                    result,
                                                    index

                                                ) => (

                                                    <tr
                                                        key={index}
                                                    >

                                                        <td>

                                                            {result.course}

                                                        </td>

                                                        <td>

                                                            {

                                                                result.midterm_grade ??

                                                                "-"

                                                            }

                                                        </td>

                                                        <td>

                                                            {

                                                                result.final_grade ??

                                                                "-"

                                                            }

                                                        </td>

                                                        <td>

                                                            {

                                                                result.letter_grade ||

                                                                "-"

                                                            }

                                                        </td>

                                                        <td>

                                                            {

                                                                result.gpa_points ??

                                                                0

                                                            }

                                                        </td>

                                                    </tr>

                                                )

                                            )

                                        )

                                    }

                                </tbody>

                            </table>

                        </div>

                    )

                }

            </div>

        </div>

    </StudentLayout>

);


}

export default Results;
