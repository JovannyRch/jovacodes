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


export default function Dashboard({ auth, expressions, sum_of_expressions: sumOfExpressions, average, latest_expressions }) {


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

    const formatDateWithTime = (date) => {
        return new Date(date).toLocaleString();
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="mb-8 text-3xl font-bold">Welcome back, {auth.user.name}!</h1>

                            <div className=" md:max-w-[70%]  mx-auto">
                                <Line data={data} options={options} />
                            </div>

                        </div>
                        <hr className="my-8" />

                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                        <div className="p-6 text-gray-900">
                                            <h3 className="mb-4 text-xl font-bold">
                                                Total calculations
                                            </h3>
                                            <p className="text-4xl font-bold text-center">
                                                {formatNumber(sumOfExpressions)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                        <div className="p-6 text-gray-900">
                                            <h3 className="mb-4 text-xl font-bold">
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

                        <div className="mt-8 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <h3 className="mb-4 text-xl font-bold">
                                    Latest expressions
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                                    Expression
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                                    Count
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                                    Type
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                                    Origin
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                                    Created at
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {latest_expressions.map((expression) => (
                                                <tr key={expression.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{expression.expression}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{expression.count}</div>
                                                    </td>
                                                    <td>
                                                        <div className="text-sm text-gray-900">{expression.type}</div>
                                                    </td>
                                                    <td>
                                                        <div className="text-sm text-gray-900">{expression.origin}</div>
                                                    </td>
                                                    <td>
                                                        <div className="text-sm text-gray-900">
                                                            {
                                                                formatDateWithTime(expression.created_at)
                                                            }
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>



                    </div>


                </div>

            </div>
        </AuthenticatedLayout>
    );
}
