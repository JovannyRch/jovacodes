import { TruthTable } from "@/classes/TruthTable";
import React, { useState } from "react";


const formatValue = (value) => {
    if (+value === 1) {
        return 'V'
    }
    return 'F'
}

const getValueColor = (value) => {
    if (+value === 1) {
        return 'text-green-600'
    }
    return 'text-red-600'
}



const STEP_OFFSET = 6

const SolutionTable = ({ n, variables = [], step = 0, t }) => {


    const [selectedStep, setSelectedStep] = useState(null)
    const [exampleResults, setExampleResults] = useState(null)

    const widthTable = 50 + (variables.length * 50)

    const indexVariable = variables.length - Math.min(variables.length, step - STEP_OFFSET)
    const stepIndex = (step - STEP_OFFSET - variables.length) + 1

    const showSteps = true;

    const handleClickOnStep = (step) => {
        setSelectedStep(step)
        const expression = step.operator.example;
        const tt = new TruthTable('es', expression)
        tt.init()
        setExampleResults(tt)
        console.log("step", step);
        document.getElementById('my_modal_1').showModal()
    }


    return <>


        <div className={`relative overflow-x-auto mt-6 `} >
            <table className={`w-full text-sm text-left rtl:text-right text-gray-500 mx-auto`} style={{ width: `${widthTable}px` }}>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th className=" w-[25px] border text-transparent">
                            ##
                        </th>

                        {
                            variables.map((variable, index) => {
                                return <th key={index} className="px-6 py-3 font-bold text-center lowercase border font-xl whitespace-nowrap ">
                                    <div className="text-4xl">
                                        {variable}
                                    </div>
                                </th>
                            })
                        }

                        {
                            showSteps && <>
                                {
                                    Array.from({ length: t.steps.length }, (_, index) => {
                                        return <th key={index} className="px-6 py-3 mx-auto font-bold text-center lowercase border cursor-pointer font-2xl "
                                            onClick={(e) => {
                                                if (e.target.tagName === 'TH') {
                                                    handleClickOnStep(t.steps[index])
                                                }
                                            }}
                                        >
                                            <input className="block text-2xl text-center text-gray-900 border-gray-300 border-none rounded-lg cursor-hide bg-gray-50 focus:ring-blue-500 focus:border-blue-500" />
                                        </th>
                                    })
                                }
                            </>
                        }

                    </tr>
                </thead>
                <tbody>
                    {
                        Array.from({ length: n }, (_, rowIndex) => {
                            return <tr className="bg-white border-b " key={rowIndex}>
                                <td className="text-xl text-center border">
                                    <sub>
                                        {rowIndex + 1}
                                    </sub>
                                </td>
                                {
                                    variables.map((variable, index) => {
                                        return <td className={`px-6 py-4 text-center border-x font-bold`} key={`${variable}-${rowIndex} `}>
                                            <div className={`min-h-[25px] text-4xl ${(index + 1) === indexVariable ? getValueColor(t.columns[variable][rowIndex]) + ' text-2xl font-bold' : ''}`}>
                                                {
                                                    indexVariable <= (index + 1) ? formatValue(t.columns[variable][rowIndex]) : ' '
                                                }
                                            </div>

                                        </td>
                                    })
                                }
                                {
                                    showSteps && <>
                                        {
                                            Array.from({ length: t.steps.length }, (_, index) => {
                                                return <th key={index} className="px-6 py-3 font-bold text-center border font-2xl whitespace-nowrap ">
                                                    <div className='min-h-[25px] text-4xl '>

                                                        <input
                                                            onFocus={(e) => {
                                                                e.target.value = formatValue(t.columns[t.steps[index].toString()][rowIndex])
                                                            }}

                                                            className="block text-2xl text-center text-gray-900 border-0 border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" />
                                                    </div>
                                                </th>
                                            })
                                        }
                                    </>
                                }

                            </tr>

                        })
                    }



                </tbody>
            </table>

            <div className="flex justify-center mt-6">
                <div className="text-center">
                    <div className="text-3xl text-gray-700">

                        {stepIndex >= 2 ? t.tipo : ''}
                    </div>
                </div>
            </div>


            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">

                    <div className="flex flex-col items-center justify-between mb-4 ">
                        <div className="w-full text-2xl font-bold text-center text-gray-800">
                            {selectedStep?.operator?.esName}
                        </div>
                        {/*  <div className="w-full text-2xl font-bold text-center text-gray-800">
                            {selectedStep?.operator?.value}
                        </div> */}
                    </div>

                    {exampleResults && <table className={`w-full text-sm text-left rtl:text-right text-gray-500 mx-auto`} style={{ width: `${widthTable}px` }}>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>


                                {
                                    exampleResults.variables.map((variable, index) => {
                                        return <th key={index} className="px-6 py-3 font-bold text-center lowercase border font-2xl whitespace-nowrap ">
                                            <div className="text-xl">
                                                {variable}
                                            </div>
                                        </th>
                                    })
                                }

                                {
                                    Array.from({ length: exampleResults.steps.length }, (_, index) => {
                                        return <th key={index} className="px-6 py-3 font-bold text-center lowercase border cursor-pointer font-2xl whitespace-nowrap"
                                        >
                                            <div className="text-xl">
                                                {selectedStep.operator.example}
                                            </div>
                                        </th>
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array.from({ length: Math.pow(exampleResults.variables.length, 2) }, (_, rowIndex) => {
                                    return <tr className="bg-white border-b " key={rowIndex}>

                                        {
                                            exampleResults.variables.map((variable, index) => {
                                                return <td className={`px-6 py-4 text-center border-x font-bold`} key={`example-${variable}-${rowIndex} `}>
                                                    <div className={`min-h-[25px] text-xl`}>
                                                        {formatValue(exampleResults.columns[variable][rowIndex])}
                                                    </div>

                                                </td>
                                            })
                                        }
                                        {
                                            Array.from({ length: exampleResults.steps.length }, (_, index) => {
                                                return <th key={index} className="px-6 py-3 font-bold text-center border font-2xl whitespace-nowrap ">
                                                    <div className='min-h-[25px] text-xl '>

                                                        {formatValue(exampleResults.columns[exampleResults.steps[index].toString()][rowIndex])}
                                                    </div>
                                                </th>
                                            })
                                        }

                                    </tr>

                                })
                            }



                        </tbody>
                    </table>}
                </div>
            </dialog>
        </div>

    </>;
};

export default SolutionTable;