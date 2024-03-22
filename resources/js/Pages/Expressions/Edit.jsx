import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { TruthTable } from '@/classes/TruthTable';
import { Head, router } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

export default function Index({ auth, expression }) {

    const [values, setValues] = useState({
        ...expression
    })

    const t = useMemo(() => {
        const tt = new TruthTable('es', expression.expression)
        tt.init()
        return tt;
    })


    const types = [
        '',
        'Contingency',
        'Contradiction',
        'Tautology',
    ]

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        router.patch(route('expressions.update', expression.id), values)
    }


    //Handle confirm delete
    function onConfirmDelete() {
        if (confirm('Are you sure you want to delete this expression?')) {
            router.delete(route('expressions.destroy', expression.id))
        }
    }

    function onGoPDF() {
        router.get(route('expressions.pdf', { variables: t.variables }))
    }


    if (!expression) {
        return (
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Loading...
                </h2>}
            >
                <Head title="Loading..." />
            </AuthenticatedLayout>
        )
    }





    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">
                {expression.expression}
            </h2>}
        >
            <Head title={expression.expression} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            <form onSubmit={handleSubmit}>
                                <label htmlFor="count" className="block text-sm font-medium text-gray-700">
                                    Type
                                </label>
                                <select className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" name="type" id="type"

                                    onChange={handleChange}
                                    value={values.type ?? ''}
                                >
                                    {types.map((type) => (
                                        <option value={type} key={type}>{type}</option>
                                    ))}
                                </select>


                                <div className="mt-4">
                                    <label htmlFor="count" className="block text-sm font-medium text-gray-700">
                                        Count
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            disabled
                                            readOnly
                                            type="number"
                                            id="count"
                                            name="count"
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                                            onChange={handleChange}
                                            value={values.count ?? 0}
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="youtube_url" className="block text-sm font-medium text-gray-700">
                                        Youtube Video
                                    </label>
                                    <div className="mt-1">
                                        <div className='flex items-center gap-2'>
                                            <input
                                                type="text"
                                                id="youtube_url"
                                                name="youtube_url"
                                                className="flex-1 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"

                                                value={values.youtube_url ?? ''}
                                                onChange={handleChange}
                                            />

                                            {
                                                expression.youtube_url && <div className="p-2 mt-1 bg-orange-500 rounded cursor-pointer"
                                                    onClick={() => window.open(expression.youtube_url)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                                                    </svg>

                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-4">


                                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                        Save
                                    </button>

                                    <a href={route('expressions.pdf', {
                                        variables: t.variables.join(','),
                                        expression: t.infix,
                                        n: t.variables.length,
                                        table: t.finalTable,
                                        type: values.type,
                                    })}

                                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">
                                        Get PDF
                                    </a>


                                    <button type="button" onClick={onConfirmDelete} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                                        Delete
                                    </button>


                                    <button type="button" onClick={() => router.back()} className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                                        Cancel
                                    </button>


                                </div>
                            </form>


                        </div>
                    </div>
                </div>
            </div >
        </AuthenticatedLayout >
    );
}
