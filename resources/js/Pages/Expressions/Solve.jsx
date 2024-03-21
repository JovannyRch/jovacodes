import RowInfo from '@/Components/RowInfo';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { TruthTable } from '@/classes/TruthTable';
import { Head } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import VariablesCard from './StepByStepSolution/VariablesCard';
import SolutionTable from './StepByStepSolution/SolutionTable';

const operators = ['() : Paréntesis', '¬ ~ : Negación', '∧ : Conjunción', '∨ : Disyunción', '→ : Implicación', '↔ : Doble implicación']

export default function Index({ auth, expression }) {

    const [totalRows, setTotalRows] = useState('')
    const [step, setStep] = useState(0)



    const t = useMemo(() => {
        const tt = new TruthTable('es', expression.expression)
        tt.init()
        return tt;
    })


    const handleCalculateRows = () => {
        setTotalRows(Math.pow(2, t.variables.length))
    }


    useEffect(() => {
        const handleOnKeyPress = (e) => {
            if (e.key === 'ArrowRight') {
                setStep((step) => step + 1)
            }
            if (e.key === 'ArrowLeft') {
                setStep((step) => Math.max(0, step - 1))
            }
            if (e.key === '1') {
                document.getElementById('my_modal_2').showModal()
            }

            if (e.key === '0') {
                setStep(0)
            }
        }



        window.addEventListener('keydown', handleOnKeyPress)

        return () => {
            window.removeEventListener('keydown', handleOnKeyPress)
        }
    }, [])

    useEffect(() => {
        if (step === 4) {
            handleCalculateRows()
        }
        if (step < 4) {
            setTotalRows('')
        }
    }, [step])



    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">
                {expression.expression}
            </h2>}
        >
            <Head title={`Solve ${expression.expression}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg min-h-[80vh]">
                        <div className={`p-6 text-gray-900 ${step === 0 ? 'flex justify-center items-center h-[50vh]' : ''}`}    >




                            {
                                step < (9 + t.variables.length) && <h2 className={`pl-10 mb-10 text-6xl font-bold leading-tight text-center text-gray-800 ${step === 0 ? 'h-[150px] text-[200px]' : ''}`}>
                                    {expression.expression}
                                </h2>
                            }
                            <RowInfo title="Proposiciones" value={t.variables.join(', ')} show={step >= 2 && step <= 5} />
                            <RowInfo title="n=" value={t.variables.length} show={step >= 3 && step <= 5} />
                            <VariablesCard title="T. de filas" n={t.variables.length} value={totalRows} show={step >= 4 && step <= 5} onChange={handleCalculateRows}

                            />

                            {step >= 6 && totalRows && <SolutionTable t={t} step={step} n={totalRows} variables={t.variables} />}

                        </div>
                    </div>
                </div>
            </div>

            <dialog id="my_modal_2" className="modal ">
                <div className="modal-box dark:bg-white">

                    <div className="flex flex-col items-center justify-between mb-4 ">
                        <div className="w-full text-2xl font-bold text-center text-gray-800">
                            Jerarquía
                        </div>

                    </div>


                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 rtl:text-right ">

                            <tbody>
                                {
                                    operators.map((operator, index) => (<tr key={index} className="border-b odd:bg-white even:bg-gray-50 ">
                                        {
                                            <td className="px-6 py-4 text-3xl text-center">
                                                {operator}
                                            </td>
                                        }
                                    </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>




            </dialog>
        </AuthenticatedLayout>
    );
}
