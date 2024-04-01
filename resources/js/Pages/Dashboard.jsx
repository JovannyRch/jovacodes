import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useMemo } from 'react';
import { COLORS, kMainColor, kMainColor30 } from '@/Helpers/const';
import { formatNumber } from '@/Helpers/formatNumber';
import { formatDateWithTime } from '@/Helpers/formatDateWithTime';


const InfoCard = ({ title, value }) => {
    return (
        <div className='flex flex-col gap-2'>
            <div className='text-gray-200'>{title}</div>
            <div className='text-3xl font-bold text-white'>
                {formatNumber(value)}
            </div>
        </div>
    )
}


const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};


export default function Dashboard({ auth, expressions_previous_week: expressionsPreviousWeek,
    expressions, sum_of_expressions: sumOfExpressions, today_sum: todaySum, latest_expressions, month_sum: monthSum, count_pdf_created: countPdfCreated,
    yesterday_sum: yesterdaySum,
    last_month_sum: lastMonthSum,
    today_pdf_created: todayPdfCreated,
    month_pdf_created: monthPdfCreated,
    yesterday_pdf_created: yesterdayPdfCreated,
    last_month_pdf_created: lastMonthPdfCreated
}) {


    const data = useMemo(() => {
        return {
            labels: expressions.map((expression) => expression.date),
            datasets: [
                {
                    label: 'Last 7 days calculations',
                    data: expressions.map((expression) => expression.total),
                    fill: false,
                    backgroundColor: COLORS.kMainColor,
                    borderColor: COLORS.kMainColor80,
                    tension: 0.3,
                },
                {
                    label: 'Previous 7 days calculations',
                    data: expressionsPreviousWeek.map((expression) => expression.total),
                    fill: false,
                    backgroundColor: COLORS.kMainColor50,
                    borderColor: COLORS.kMainColor30,
                    tension: 0.3,
                }
            ],
        };
    });





    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Main page</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">




                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    <div className=" p-6 bg-[#5f6368] border border-gray-200 rounded-lg shadow  mb-4">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                                Calculations
                            </h5>
                        </a>
                        <div className="grid grid-cols-4 gap-2 md:grid-cols-5 sm:grid-cols-2" >
                            <InfoCard title="Today" value={todaySum} />
                            <InfoCard title="Yesterday" value={yesterdaySum} />
                            <InfoCard title="This month" value={monthSum} />
                            <InfoCard title="Last month" value={lastMonthSum} />
                            <InfoCard title="All the time" value={sumOfExpressions} />
                        </div>
                    </div>

                    <div className=" p-6 bg-[#5f6368] border border-gray-200 rounded-lg shadow  mb-4">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                                PDFs created
                            </h5>
                        </a>
                        <div className="grid grid-cols-4 gap-2 md:grid-cols-5 sm:grid-cols-2" >
                            <InfoCard title="Today" value={todayPdfCreated} />
                            <InfoCard title="Yesterday" value={yesterdayPdfCreated} />
                            <InfoCard title="This month" value={monthPdfCreated} />
                            <InfoCard title="Last month" value={lastMonthPdfCreated} />
                            <InfoCard title="All the time" value={countPdfCreated} />
                        </div>
                    </div>


                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">


                            <div className=" md:max-w-[70%]  mx-auto">
                                <Line data={data} options={options} />
                            </div>

                        </div>
                        <hr className="my-8" />

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
