import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useMemo } from 'react';
import { kMainColor, kMainColor30 } from '@/Helpers/const';



const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};


export default function Dashboard({ auth, expressions }) {


    const data = useMemo(() => {
        console.log("expressions", expressions);
        return {
            labels: expressions.map((expression) => expression.date),
            datasets: [
                {
                    label: 'Cantidad de llamados',
                    data: expressions.map((expression) => expression.total),
                    fill: false,
                    backgroundColor: kMainColor,
                    borderColor: kMainColor30,
                    tension: 0.3,
                },
            ],
        };
    });



    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-3xl font-bold mb-8">Welcome back, {auth.user.name}!</h1>

                            <div className=" md:max-w-[70%]  mx-auto">
                                <Line data={data} options={options} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
