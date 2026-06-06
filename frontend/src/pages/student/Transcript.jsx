import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";
import StudentLayout from "../../layouts/StudentLayout";

function Transcript() {

const navigate =
    useNavigate();

const [transcript, setTranscript] =
    useState(null);

const [loading, setLoading] =
    useState(true);

useEffect(() => {

    loadTranscript();

}, []);

const loadTranscript = async () => {

    try {

        const response =
            await api.get(
                "/student/transcript/"
            );

        setTranscript(
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

const downloadPDF = async () => {

    try {

        const response =
            await api.get(

                "/student/transcript/pdf/",

                {
                    responseType:
                        "blob"
                }

            );

        const blob =
            new Blob(

                [response.data],

                {
                    type:
                        "application/pdf"
                }

            );

        const url =
            window.URL.createObjectURL(
                blob
            );

        const link =
            document.createElement(
                "a"
            );

        link.href = url;

        link.download =
            "transcript.pdf";

        document.body.appendChild(
            link
        );

        link.click();

        link.remove();

    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to download transcript"
        );

    }

};

if (loading) {

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

                Academic Transcript

            </h2>

        </div>

        <div className="card border-0 shadow-sm mb-4">

            <div className="card-body">

                <div className="row">

                    <div className="col-md-6">

                        <h5>

                            Student Information

                        </h5>

                        <p>

                            <strong>
                                Student:
                            </strong>

                            {" "}

                            {transcript.student}

                        </p>

                        <p>

                            <strong>
                                Student ID:
                            </strong>

                            {" "}

                            {transcript.student_id}

                        </p>

                    </div>

                    <div className="col-md-6 text-md-end">

                        <h4>

                            GPA

                        </h4>

                        <h1>

                            {transcript.gpa}

                        </h1>

                        <p>

                            Credits Earned:

                            {" "}

                            {transcript.total_credits}

                        </p>

                    </div>

                </div>

            </div>

        </div>

        <div className="card border-0 shadow-sm">

            <div className="card-body">

                <div className="d-flex justify-content-between mb-3">

                    <h5>

                        Academic Record

                    </h5>

                    <button

                        className="btn btn-danger"

                        onClick={
                            downloadPDF
                        }

                    >

                        Download PDF

                    </button>

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

                                <th>

                                    Final Grade

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

                                transcript.courses
                                .length === 0

                                ?

                                (

                                    <tr>

                                        <td

                                            colSpan="6"

                                            className="text-center"

                                        >

                                            No transcript records found

                                        </td>

                                    </tr>

                                )

                                :

                                (

                                    transcript.courses.map(

                                        (

                                            course,
                                            index

                                        ) => (

                                            <tr
                                                key={index}
                                            >

                                                <td>

                                                    {
                                                        course.course_code
                                                    }

                                                </td>

                                                <td>

                                                    {
                                                        course.course_name
                                                    }

                                                </td>

                                                <td>

                                                    {
                                                        course.credits
                                                    }

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

                                                <td>

                                                    {

                                                        course.gpa_points ??
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

            </div>

        </div>

    </StudentLayout>

);


}

export default Transcript;
