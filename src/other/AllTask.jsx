import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { FiSearch } from 'react-icons/fi';

const AllTask = () => {
    const [userData] = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Filter and sort employees based on the search term and department
    const filteredUsers = userData
        .filter(user => user.firstName.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => a.department.localeCompare(b.department)); // Sort by department

    return (
        <div className="bg-[#1e1e1e] rounded-xl shadow-md shadow-black/10 p-4 sm:p-6 mt-6 w-full sm:w-11/12 lg:w-full mx-auto">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-100 text-center sm:text-left">
                    Task Overview
                </h2>

                {/* Search Bar */}
                <div className="relative flex items-center mt-2 sm:mt-0">
                    <button
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className="p-2 bg-black rounded-full text-gray-300 hover:bg-gray-800"
                    >
                        <FiSearch size={20} />
                    </button>
                    {isSearchOpen && (
                        <input
                            type="text"
                            placeholder="Search Employee..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="ml-2 p-2 w-full sm:w-64 rounded-md bg-black text-gray-300 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                    )}
                </div>
            </div>

            {/* Responsive Table Container */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-max border-collapse">
                    <thead>
                        <tr className="bg-black text-gray-300 text-sm sm:text-base">
                            <th className="px-3 py-2 sm:px-4 sm:py-3 text-left font-semibold min-w-[150px]">
                                Employee Name
                            </th>
                            <th className="px-3 py-2 sm:px-4 sm:py-3 text-left font-semibold min-w-[150px]">
                                Department
                            </th>
                            <th className="px-3 py-2 sm:px-4 sm:py-3 text-center font-semibold min-w-[100px]">
                                New Task
                            </th>
                            <th className="px-3 py-2 sm:px-4 sm:py-3 text-center font-semibold min-w-[100px]">
                                Active Task
                            </th>
                            <th className="px-3 py-2 sm:px-4 sm:py-3 text-center font-semibold min-w-[100px]">
                                Completed
                            </th>
                            <th className="px-3 py-2 sm:px-4 sm:py-3 text-center font-semibold min-w-[100px]">
                                Failed
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((element) => (
                            <tr key={element.id} className="border-b border-gray-700 hover:bg-[#292929] transition">
                                <td className="px-3 py-2 sm:px-4 sm:py-3 text-gray-100 text-left">
                                    {element.firstName}
                                </td>
                                <td className="px-3 py-2 sm:px-4 sm:py-3 text-gray-100 text-left">
                                    {element.department}
                                </td>
                                <td className="px-3 py-2 sm:px-4 sm:py-3 text-gray-300 text-center">
                                    {element.taskCounts.newTask}
                                </td>
                                <td className="px-3 py-2 sm:px-4 sm:py-3 text-gray-300 text-center">
                                    {element.taskCounts.active}
                                </td>
                                <td className="px-3 py-2 sm:px-4 sm:py-3 text-gray-300 text-center">
                                    {element.taskCounts.completed}
                                </td>
                                <td className="px-3 py-2 sm:px-4 sm:py-3 text-gray-300 text-center">
                                    {element.taskCounts.failed}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllTask;
