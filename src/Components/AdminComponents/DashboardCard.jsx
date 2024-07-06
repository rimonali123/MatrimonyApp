import { SiDatabricks } from "react-icons/si";
import { GiReceiveMoney } from "react-icons/gi";
import { MdWorkspacePremium } from "react-icons/md";
// import { Link } from "react-router-dom";


import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hoock/useAxiosSecure";
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const DashboardCard = ({ items }) => {
    console.log(items)
    const axiosSecure = useAxiosSecure();

    const { data: earning } = useQuery({
        queryKey: ['adminrevenue'],
        queryFn: async () => {
            const res = await axiosSecure.get('/adminrevenue')
            return res.data
        }
    })
    console.log(earning)




    const filteredMale = items?.filter(item => item.bioType === 'Male');

    const totalMaleBio = filteredMale?.length


    const filteredFemale = items?.filter(item => item.bioType === 'Female');

    const totalFemaleBio = filteredFemale?.length

    const totalBio = items?.length

    const totalPremiumUser = 4;

    // const earning?.revenue = `${earning}`;



    const data = [
        { name: 'Male', value: totalMaleBio },
        { name: 'Female', value: totalFemaleBio },
        { name: 'TotalBio', value: totalBio },
        { name: 'Revinue', value: earning?.revenue },
        { name: 'PremiumUser', value: totalPremiumUser },
    ]
    console.log(data)





    return (
        <div>

            <div className="mb-10 md:flex hidden">

                <PieChart width={650} height={300}>
                    <Pie
                        data={data}
                        cx={300}
                        cy={100}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend></Legend>
                    <Tooltip></Tooltip>
                </PieChart>
            </div>

            
            <div className="mb-10 md:hidden flex">

                <PieChart width={400} height={300}>
                    <Pie
                        data={data}
                        cx={200}
                        cy={150}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={90}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend></Legend>
                    <Tooltip></Tooltip>
                </PieChart>
            </div>
            <div>
                <div className="flex flex-col md:flex-row gap-10 lg:w-2/3 mx-auto ">
                    <div className=" bg-sky-400 shadow-md text-center text-white p-5 rounded-xl space-y-3">
                        <SiDatabricks className="text-5xl mx-auto" />
                        <p className="text-2xl">{totalBio}</p>
                        <h1 className="text-3xl font-bold">Total Biodata</h1>

                    </div>

                    <div className=" bg-sky-400 shadow-md text-center text-white p-5 rounded-xl space-y-3">
                        <GiReceiveMoney className="text-5xl mx-auto" />
                        <p className="text-2xl">{earning?.revenue}</p>
                        <h1 className="text-3xl font-bold">Total Revinue</h1>

                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-10 lg:w-2/3 mx-auto mt-10 ">
                    <div className=" bg-sky-400 shadow-md text-center text-white p-5 rounded-xl space-y-3">
                        <SiDatabricks className="text-5xl mx-auto" />
                        <p className="text-2xl">{totalMaleBio}</p>
                        <h1 className="text-3xl font-bold">Total Male Biodata</h1>

                    </div>

                    <div className=" bg-sky-400 shadow-md text-center text-white p-5 rounded-xl space-y-3">
                        <SiDatabricks className="text-5xl mx-auto" />
                        <p className="text-2xl">{totalFemaleBio}</p>
                        <h1 className="text-3xl font-bold">Total Female Biodata</h1>

                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-10 lg:w-2/3 mx-auto mt-10 ">
                    <div className=" bg-sky-400 shadow-md text-center w-full text-white p-5 rounded-xl space-y-3">
                        <MdWorkspacePremium className="text-5xl mx-auto" />
                        <p className="text-2xl">{totalPremiumUser}</p>
                        <h1 className="text-3xl font-bold">Total Premium Biodata</h1>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default DashboardCard;


