import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function StudentsByProgramChart({
    data
}) {

    return (

        <ResponsiveContainer
            width="100%"
            height={300}
        >

            <PieChart>

                <Pie

                    data={data}

                    dataKey="students"

                    nameKey="program"

                    outerRadius={100}

                    fill="#8884d8"

                    label

                >

                    {data.map(
                        (entry, index) => (

                        <Cell
                            key={index}
                        />

                    ))}

                </Pie>

                <Tooltip />

            </PieChart>

        </ResponsiveContainer>

    );

}

export default StudentsByProgramChart;