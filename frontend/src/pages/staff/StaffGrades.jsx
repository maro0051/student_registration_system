import {
    useEffect,
    useState
} from "react";

import {
    useParams,
    useNavigate
} from "react-router-dom";

import api from "../../api/axios";

import StaffLayout from "../../layouts/StaffLayout";

function StaffGrades() {

    const { id } =
        useParams();

    const navigate =
        useNavigate();

    const [students, setStudents] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadGrades();

    }, []);

    const loadGrades = async () => {

        try {

            const response =
                await api.get(

                    `/staff/grades/${id}/`

                );

            setStudents(
                response.data
            );

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    const handleChange = (

        index,

        field,

        value

    ) => {

        const updated =
            [...students];

        updated[index][field] =
            value;

        setStudents(
            updated
        );

    };

    const saveGrades = async () => {

        try {

            await api.post(

                `/staff/grades/${id}/`,

                {

                    grades:

                        students

                }

            );

            alert(

                "Grades saved successfully"

            );

            navigate(
                "/staff/myclasses"
            );

        }

        catch (error) {

            console.error(error);

            alert(
                "Failed to save grades"
            );

        }

    };

    return (

        <StaffLayout>

            <div className="d-flex justify-content-between mb-4">

                <h2>

                    Grade Management

                </h2>

                <button

                    className="btn btn-secondary"

                    onClick={() =>
                        navigate(-1)
                    }

                >

                    Back

                </button>

            </div>

            <div className="card">

                <div className="card-body">

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

                            <>

                                <div className="table-responsive">

                                    <table className="table table-hover">

                                        <thead>

                                            <tr>

                                                <th>

                                                    Student ID

                                                </th>

                                                <th>

                                                    Student

                                                </th>

                                                <th>

                                                    Midterm

                                                </th>

                                                <th>

                                                    Final

                                                </th>

                                                <th>

                                                    Letter

                                                </th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            {

                                                students.map(

                                                    (

                                                        student,

                                                        index

                                                    ) => (

                                                        <tr
                                                            key={
                                                                student.enrollment_id
                                                            }
                                                        >

                                                            <td>

                                                                {
                                                                    student.student_id
                                                                }

                                                            </td>

                                                            <td>

                                                                {
                                                                    student.student
                                                                }

                                                            </td>

                                                            <td>

                                                                <input

                                                                    type="number"

                                                                    className="form-control"

                                                                    value={

                                                                        student.midterm_grade ||

                                                                        ""

                                                                    }

                                                                    onChange={

                                                                        e =>

                                                                            handleChange(

                                                                                index,

                                                                                "midterm_grade",

                                                                                e.target.value

                                                                            )

                                                                    }

                                                                />

                                                            </td>

                                                            <td>

                                                                <input

                                                                    type="number"

                                                                    className="form-control"

                                                                    value={

                                                                        student.final_grade ||

                                                                        ""

                                                                    }

                                                                    onChange={

                                                                        e =>

                                                                            handleChange(

                                                                                index,

                                                                                "final_grade",

                                                                                e.target.value

                                                                            )

                                                                    }

                                                                />

                                                            </td>

                                                            <td>

                                                                {

                                                                    student.letter_grade

                                                                }

                                                            </td>

                                                        </tr>

                                                    )

                                                )

                                            }

                                        </tbody>

                                    </table>

                                </div>

                                <button

                                    className="
                                        btn
                                        btn-success
                                    "

                                    onClick={
                                        saveGrades
                                    }

                                >

                                    Save Grades

                                </button>

                            </>

                        )

                    }

                </div>

            </div>

        </StaffLayout>

    );

}

export default StaffGrades;