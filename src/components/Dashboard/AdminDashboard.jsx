import React, { useState, useEffect } from "react";
import Header from "../../other/Header";
import CreateTask from "../../other/CreateTask";
import AllTask from "../../other/AllTask";
import CreateEmployee from "../../other/CreateEmployee";
import EmployeeProgressGraph from "../../other/Progress";

const AdminDashboard = ({ changeUser }) => {
    const [showCreateTaskForm, setShowCreateTaskForm] = useState(false);
    const [showCreateEmployeeForm, setShowCreateEmployeeForm] = useState(false);
    const [showProgressPopup, setShowProgressPopup] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const employees = JSON.parse(localStorage.getItem("employees")) || [];
        setTasks(employees.length > 0 ? employees[0].tasks : []);
    }, []);

    // ✅ Function to handle new task creation with unique ID
    const handleTaskCreated = (newTask) => {
        const uniqueTask = { ...newTask, taskId: crypto.randomUUID() }; // Assign unique ID

        // Update the tasks list
        setTasks((prevTasks) => [...prevTasks, uniqueTask]);

        // Save updated tasks to localStorage
        const employees = JSON.parse(localStorage.getItem("employees")) || [];
        if (employees.length > 0) {
            employees[0].tasks.push(uniqueTask);
            localStorage.setItem("employees", JSON.stringify(employees));
        }

        setShowCreateTaskForm(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#0A0B1F] via-[#2D2F48] to-[#1C1D34] text-white p-8 md:p-12">
            <Header changeUser={changeUser} />

            <div className="mt-10 space-y-12">
                {/* Create Task Button */}
                {!showCreateTaskForm && (
                    <div className="flex justify-center">
                        <button
                            onClick={() => setShowCreateTaskForm(true)}
                            className="bg-[#222636] text-[#F4F7FF] py-2 px-4 rounded-lg text-lg font-semibold shadow-md hover:shadow-xl transition-all transform hover:scale-105"
                        >
                            Create New Task
                        </button>
                    </div>
                )}

                {showCreateTaskForm && (
                    <section className="bg-[#222636] p-10 rounded-lg shadow-xl">
                        <h2 className="text-4xl font-semibold text-[#F4F7FF] mb-8">Create New Task</h2>
                        <CreateTask onTaskCreated={handleTaskCreated} />
                    </section>
                )}

                 {/* View Progress Stats Button */}
                {!showCreateEmployeeForm && (
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => setShowProgressPopup(true)}
                            className="bg-[#222636] text-[#F4F7FF] py-2 px-4 rounded-lg text-lg font-semibold shadow-md hover:shadow-xl transition-all transform hover:scale-105"
                        >
                            View Progress Stats
                        </button>
                    </div>
                )}

                {showProgressPopup && <EmployeeProgressGraph onClose={() => setShowProgressPopup(false)} />}

                {/* Add Employee Button */}
                {!showCreateEmployeeForm && (
                    <div className="flex justify-center">
                        <button
                            onClick={() => setShowCreateEmployeeForm(true)}
                            className="bg-[#222636] text-[#F4F7FF] py-2 px-4 rounded-lg text-lg font-semibold shadow-md hover:shadow-xl transition-all transform hover:scale-105"
                        >
                            Add Employee
                        </button>
                    </div>
                )}

                {showCreateEmployeeForm && (
                    <section className="bg-[#222636] p-10 rounded-lg shadow-xl mb-6">
                        <h2 className="text-4xl font-semibold text-[#F4F7FF] mb-8">Add Employee</h2>
                        <CreateEmployee onClose={() => setShowCreateEmployeeForm(false)} />
                    </section>
                )}


                {/* All Tasks Section */}
                <section className="bg-[#222636] p-10 rounded-lg shadow-xl">
                    <h2 className="text-4xl font-semibold text-[#F4F7FF] mb-8">All Tasks</h2>
                    <AllTask tasks={tasks} />
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;
