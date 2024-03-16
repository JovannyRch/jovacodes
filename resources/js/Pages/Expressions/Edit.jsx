import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Index({ auth, expression }) {

    const [values, setValues] = useState({
        ...expression
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




    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
                {expression.expression}
            </h2>}
        >
            <Head title={expression.expression} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            <form onSubmit={handleSubmit}>
                                <label htmlFor="count" className="block text-sm font-medium text-gray-700">
                                    Type
                                </label>
                                <select className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" name="type" id="type"

                                    onChange={handleChange}
                                    value={values.type}
                                >
                                    {types.map((type) => (
                                        <option value={type} selected={values.type === type}>{type}</option>
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
                                            className="shadow-sm focus:ring-primary focus:border-primary mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                            onChange={handleChange}
                                            value={values.count}
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
                                                className="flex-1 shadow-sm focus:ring-primary focus:border-primary mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                                defaultValue={expression.youtube_url}
                                                value={values.youtube_url}
                                                onChange={handleChange}
                                            />
                                            {expression.youtube_url && <a href={values.youtube_url} target="_blank" className="text-blue-700">Open</a>}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4">


                                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                        Save
                                    </button>

                                </div>
                            </form>


                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
