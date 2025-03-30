import React, { useContext, useState } from 'react';
import { X } from 'lucide-react'; // Import cross icon
import { AuthContext } from '../context/AuthProvider';
import { showSuccessToast, showErrorToast } from '../utils/toastConfig';

const CreateEmployee = ({ onClose }) => {
    const initialState = {
        name: '',
        position: '',
        department: '',
        email: '',
    };

    const [formData, setFormData] = useState(initialState);
    const [userData, setUserData] = useContext(AuthContext);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();

        // Check if employee already exists
        const existingEmployee = userData.find((emp) => emp.email === formData.email);
        if (existingEmployee) {
            showErrorToast('Employee with this email already exists!');
            return;
        }

        // Create new employee object
        const newEmployee = {
            id: userData.length + 1,
            firstName: formData.name.split(' ')[0],
            lastName: formData.name.split(' ')[1] || '',
            position: formData.position,
            department: formData.department,
            email: formData.email,
            tasks: [],
            taskCounts: {
                newTask: 0,
                active: 0,
                completed: 0,
                failed: 0,
            },
        };

        // Update state
        setUserData((prevData) => [...prevData, newEmployee]);
        showSuccessToast('Employee added successfully!');
        setFormData(initialState);
        if (onClose) onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-[#212121] w-full max-w-md p-6 rounded-lg shadow-lg relative">

                {/* Header with Title & Close Icon */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-200">Add Employee</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                {/* Employee Form */}
                <form onSubmit={submitHandler} className="space-y-4">

                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Full Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-lg border border-gray-700 bg-[#333] text-gray-300 focus:ring-2 focus:ring-indigo-500"
                            type="text"
                            placeholder="Enter full name"
                            required
                        />
                    </div>

                    {/* Position */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Position</label>
                        <input
                            name="position"
                            value={formData.position}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-lg border border-gray-700 bg-[#333] text-gray-300 focus:ring-2 focus:ring-indigo-500"
                            type="text"
                            placeholder="E.g. Software Engineer, Manager"
                            required
                        />
                    </div>

                    {/* Department */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Department</label>
                        <input
                            name="department"
                            value={formData.department}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-lg border border-gray-700 bg-[#333] text-gray-300 focus:ring-2 focus:ring-indigo-500"
                            type="text"
                            placeholder="E.g. IT, HR, Marketing"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Email</label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-lg border border-gray-700 bg-[#333] text-gray-300 focus:ring-2 focus:ring-indigo-500"
                            type="email"
                            placeholder="Enter employee email"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-all"
                    >
                        Add Employee
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateEmployee;
