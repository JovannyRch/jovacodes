import React from 'react';
import * as Label from '@radix-ui/react-label';

const RowInfo = ({ title, value, show = false, displayHL }) => {

    if (!show) return null;

    return <>
        <div className="flex flex-wrap items-center gap-[15px] px-5 mb-6 justify-center">
            <Label.Root className="text-2xl font-bold leading-[35px] text-black min-w-[150px]" >
                {title}
            </Label.Root>
            <div
                className="bg-blackA2 inline-flex h-[35px] w-[300px] appearance-none items-center  rounded-[4px] px-[10px] text-2xl leading-none text-black shadow-[0_0_0_1px] shadow-[#ccc] outline-none border-none focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                type="text"

            >
                {value}
            </div>
        </div>
        {displayHL && <hr className="mx-5 border-t border-gray-300" />}
    </>
};

export default RowInfo;
