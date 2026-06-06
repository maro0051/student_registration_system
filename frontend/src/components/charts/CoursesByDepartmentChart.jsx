import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function CoursesByDepartmentChart({
    data
}) {

    return (

        <ResponsiveContainer
            width="100%"
            height={300}
        >

            <BarChart
                data={data}
            >

                <XAxis
                    dataKey="department"
                />

                <YAxis />

                <Tooltip />

                <Bar
                    dataKey="courses"
                />

            </BarChart>

        </ResponsiveContainer>

    );

}

export default CoursesByDepartmentChart;