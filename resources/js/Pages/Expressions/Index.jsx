import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { formatDateWithTime } from '@/Helpers/formatDateWithTime';

export default function Index({ auth, expressions }) {



    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Expressions</h2>}
        >
            <Head title="Expressions" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">


                            <div className="flex flex-col">
                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                        <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
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

                                                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                                            Modified at
                                                        </th>

                                                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                                            Actions
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {expressions.data.map((expression) => (
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
                                                                    {formatDateWithTime(expression.created_at)}
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <div className="text-sm text-gray-900">
                                                                    {formatDateWithTime(expression.updated_at)}
                                                                </div>
                                                            </td>



                                                            <td className="flex items-center gap-2 py-2">

                                                                <a
                                                                    href={route('expressions.solve', expression.id)}
                                                                    type="button" className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                                    Solve
                                                                </a>
                                                                <a href={route('expressions.details', expression.id)} className="px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                                                    Details
                                                                </a>



                                                                {expression.youtube_url &&
                                                                    <div className="p-2 bg-orange-500 rounded cursor-pointer"
                                                                        onClick={() => window.open(expression.youtube_url)}
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-4 h-4">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                                                                        </svg>

                                                                    </div>
                                                                }
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Pagination className="mt-6" links={expressions.links} />

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
