import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useMemo } from 'react';
import { kMainColor, kMainColor30 } from '@/Helpers/const';
import { formatNumber } from '@/Helpers/formatNumber';



const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};


export default function Dashboard({ auth, expressions, sum_of_expressions: sumOfExpressions, average, }) {


    const data = useMemo(() => {
        return {
            labels: expressions.map((expression) => expression.date),
            datasets: [
                {
                    label: 'Calculations per day',
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
                        <hr className="my-8" />

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                        <div className="p-6 text-gray-900">
                                            <h3 className="text-xl font-bold mb-4">
                                                Total calculations
                                            </h3>
                                            <p className="text-4xl font-bold text-center">
                                                {formatNumber(sumOfExpressions)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                        <div className="p-6 text-gray-900">
                                            <h3 className="text-xl font-bold mb-4">
                                                Average calculations per day
                                            </h3>
                                            <p className="text-4xl font-bold text-center">
                                                {formatNumber(average)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>


                </div>

            </div>
        </AuthenticatedLayout>
    );
}
