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

function Attendance() {

    const { id } =
        useParams();

    const navigate =
        useNavigate();

    const [students, setStudents] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadAttendance();

    }, []);

    const loadAttendance = async () => {

        try {

            const response =
                await api.get(

                    `/staff/attendance/${id}/`

                );

            setStudents(
                response.data
            );

        }

        catch (error) {

            console.error(error);

            alert(
                "Failed to load attendance list"
            );

        }

        finally {

            setLoading(false);

        }

    };

    const toggleAttendance = (
        index
    ) => {

        const updated =
            [...students];

        updated[index].present =

            !updated[index].present;

        setStudents(
            updated
        );

    };

    const saveAttendance = async () => {

        try {

            await api.post(

                `/staff/attendance/${id}/`,

                {

                    attendance:

                        students.map(

                            student => ({

                                enrollment_id:

                                    student.enrollment_id,

                                present:

                                    student.present

                            })

                        )

                }

            );

            alert(
                "Attendance saved successfully"
            );
            navigate(
                "/staff/myclasses"
            )

        }

        catch (error) {

            console.error(
                error.response?.data
            );

            console.error(error);

            alert(
                "Failed to save attendance"
            );

        }

    };

    return (

        <StaffLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>

                    Attendance

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

                                                Present

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

                                                                type="checkbox"

                                                                checked={
                                                                    student.present
                                                                }

                                                                onChange={() =>

                                                                    toggleAttendance(
                                                                        index
                                                                    )

                                                                }

                                                            />

                                                        </td>

                                                    </tr>

                                                )

                                            )

                                        }

                                    </tbody>

                                </table>

                                <button

                                    className="
                                        btn
                                        btn-primary
                                    "

                                    onClick={
                                        saveAttendance
                                    }

                                >

                                    Save Attendance

                                </button>

                            </>

                        )

                    }

                </div>

            </div>

        </StaffLayout>

    );

}

export default Attendance;