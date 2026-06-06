import {
    useEffect,
    useState
} from "react";

import api from "../../api/axios";

import StaffLayout from "../../layouts/StaffLayout";

function StaffTimetable() {

    const [classes, setClasses] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadTimetable();

    }, []);

    const loadTimetable = async () => {

        try {

            const response =
                await api.get(
                    "/staff/timetable/"
                );

            setClasses(
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

    return (

        <StaffLayout>

            <h2 className="mb-4">

                My Timetable

            </h2>

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

                            <table className="table table-hover">

                                <thead>

                                    <tr>

                                        <th>

                                            Course Code

                                        </th>

                                        <th>

                                            Course

                                        </th>

                                        <th>

                                            Section

                                        </th>

                                        <th>

                                            Room

                                        </th>

                                        <th>

                                            Schedule

                                        </th>

                                        <th>

                                            Semester

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        classes.map(

                                            (

                                                item,

                                                index

                                            ) => (

                                                <tr
                                                    key={index}
                                                >

                                                    <td>

                                                        {
                                                            item.course_code
                                                        }

                                                    </td>

                                                    <td>

                                                        {
                                                            item.course_name
                                                        }

                                                    </td>

                                                    <td>

                                                        {
                                                            item.section
                                                        }

                                                    </td>

                                                    <td>

                                                        {
                                                            item.room
                                                        }

                                                    </td>

                                                    <td>

                                                        {
                                                            item.schedule
                                                        }

                                                    </td>

                                                    <td>

                                                        {
                                                            item.semester
                                                        }

                                                    </td>

                                                </tr>

                                            )

                                        )

                                    }

                                </tbody>

                            </table>

                        )

                    }

                </div>

            </div>

        </StaffLayout>

    );

}

export default StaffTimetable;