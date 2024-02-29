import React from 'react';

// Define the types for your data
type SizeRow = {
    size: string;
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
        { size: 'S', height: 70, width: 47 },
        { size: 'M', height: 72, width: 50 },
        { size: 'L', height: 76, width: 53 },
        { size: 'XL', height: 78, width: 57 },
    ],
    female: [
        { size: 'S', height: 60, width: 38 },
        { size: 'M', height: 62, width: 40 },
        { size: 'L', height: 64, width: 42 },
        { size: 'XL', height: 66, width: 44 },
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
                                <td className="px-5 py-5 border-b border-gray-300 bg-[#ECEBE4] text-lg">
                                    <div className="flex items-center justify-center ">
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap font-bold">
                                                {row.size}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-300 bg-[#ECEBE4] text-lg text-center">
                                    <p className="text-gray-900 whitespace-no-wrap">{row.height}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-300 bg-[#ECEBE4] text-lg text-center">
                                    <p className="text-gray-900 whitespace-no-wrap">{row.width}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="px-5 py-5 text-xs text-gray-500 italic">
                *Imajte na umu da se majice mogu skupiti 2 - 3%
            </div>
        </div>
    );
};

export default SizeChart;
