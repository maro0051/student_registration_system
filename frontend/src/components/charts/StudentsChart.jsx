import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function StudentsChart({
    data
}) {

    return (

        <ResponsiveContainer
            width="100%"
            height={300}
        >

            <BarChart data={data}>

                <XAxis
                    dataKey="name"
                />

                <YAxis />

                <Tooltip />

                <Bar
                    dataKey="students"
                />

            </BarChart>

        </ResponsiveContainer>

    );

}

export default StudentsChart;