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
    { size: 'XS', height: 67, width: 50 },
    { size: 'S', height: 69, width: 52 },
    { size: 'M', height: 72, width: 54 },
    { size: 'L', height: 74, width: 57 },
    { size: 'XL', height: 76, width: 60 },
    { size: 'XXL', height: 78, width: 62 },
    { size: '3XL', height: 80, width: 64 },
    { size: '4XL', height: 82, width: 66 },
    { size: '5XL', height: 83, width: 70 },
  ],
  female: [
    { size: 'XS', height: 62, width: 40 },
    { size: 'S', height: 64, width: 42 },
    { size: 'M', height: 66, width: 45 },
    { size: 'L', height: 68.5, width: 48 },
    { size: 'XL', height: 71, width: 51 },
    { size: 'XXL', height: 73, width: 54 },
  ],
}



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
            <div className="px-5 py-5 text-lg text-gray-500 italic">
                <b>*Imajte na umu da se majice mogu skupiti do 5%</b>
            </div>
        </div>
    );
};

export default SizeChart;
