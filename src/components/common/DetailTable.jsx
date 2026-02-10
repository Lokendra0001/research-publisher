import React from 'react';

const DetailTable = ({ title = "INFORMATION", sections = [] }) => {
    return (
        <div className="w-full bg-white font-sans text-sm border border-gray-300">
            {/* Main Header */}
            <div className="bg-white border-b-2 border-orange-500 p-2 text-center">
                <h2 className="text-xl font-bold text-orange-600 uppercase tracking-wide">
                    {title}
                </h2>
            </div>

            {sections.map((section, secIndex) => (
                <div key={secIndex} className="w-full">
                    {/* Section Header */}
                    {section.header && (
                        <div className="bg-white p-2 border-b border-gray-200">
                            <h3 className="text-orange-600 font-bold italic underline decoration-orange-600 underline-offset-2">
                                {section.header}:-
                            </h3>
                        </div>
                    )}

                    {/* Section Rows */}
                    <table className="w-full border-collapse">
                        <tbody>
                            {section.items.map((item, itemIndex) => (
                                <tr key={itemIndex} className="border-b border-gray-200 last:border-b-0">
                                    <td className="w-1/3 p-2 font-bold text-gray-800 border-r border-gray-200 bg-gray-50/30 align-top">
                                        {item.label}
                                    </td>
                                    <td className="w-2/3 p-2 text-gray-700 align-top break-words">
                                        {item.value || '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default DetailTable;
