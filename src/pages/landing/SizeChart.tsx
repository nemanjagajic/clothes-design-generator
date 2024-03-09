import React from 'react';

// Define the types for your data
type SizeRow = {
    size: string;
    weightRange: string,
    height: number;
    width: number;
};

type SizeData = {
    male: SizeRow[],
    female: SizeRow[]
}

// Sample data for the table
const sizeData: SizeData = {
    male: [
        { size: 'S', weightRange: '(do 65kg)', height: 70, width: 47 },
        { size: 'M', weightRange: '(65-75kg)', height: 72, width: 50 },
        { size: 'L', weightRange: '(75-85kg)', height: 76, width: 53 },
        { size: 'XL', weightRange: '(85-95kg)', height: 78, width: 57 },
        { size: 'XXL', weightRange: '(95-115kg)', height: 86, width: 69 },
    ],
    female: [
        { size: 'S', weightRange: '(do 50kg)', height: 60, width: 38 },
        { size: 'M', weightRange: '(50-55kg)', height: 62, width: 40 },
        { size: 'L', weightRange: '(55-65kg)', height: 64, width: 42 },
        { size: 'XL', weightRange: '(65-75kg)', height: 66, width: 44 },
        { size: 'XXL', weightRange: '(75-85kg)', height: 68, width: 46 },
    ]
};



// The table component
const SizeChart: React.FC<{ gender: "male" | "female" }> = ({ gender }) => {
    return (
        <div>
            <div className="sm:max-w-[700px] bg-[#ECEBE4] border rounded-lg shadow-md mt-2 px-5 pb-5">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 bg-[#ECEBE4] text-md text-gray-600 uppercase ">
                                Veličine
                            </th>
                            <th className="px-5 py-3 bg-[#ECEBE4] text-md text-green-600 uppercase ">
                                A visina (cm)
                            </th>
                            <th className="px-5 py-3 bg-[#ECEBE4] text-md text-blue-600 uppercase ">
                                B širina (cm)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sizeData[gender].map((row, index) => (
                            <tr key={index} className="px-4">
                                <td className="md:px-5 py-5 border-b border-gray-300 bg-[#ECEBE4] text-lg">
                                    <div className="flex items-center justify-center">
                                        <div className="md:ml-3 flex flex-row items-center justify-center">
                                            <p className="text-gray-900 whitespace-no-wrap font-bold mr-2">
                                                {row.size}
                                            </p>
                                            <p className="text-gray-500 whitespace-no-wrap text-sm md:text-base">
                                                {row.weightRange}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="md:px-5 py-5 border-b border-gray-300 bg-[#ECEBE4] text-lg text-center">
                                    <p className="text-gray-900 whitespace-no-wrap">{row.height}</p>
                                </td>
                                <td className="md:px-5 py-5 border-b border-gray-300 bg-[#ECEBE4] text-lg text-center">
                                    <p className="text-gray-900 whitespace-no-wrap">{row.width}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="px-5 py-5 text-xs text-gray-500 italic">
                *Imajte na umu da se majice mogu skupiti 2 do 3%
            </div>
        </div>
    );
};

export default SizeChart;
