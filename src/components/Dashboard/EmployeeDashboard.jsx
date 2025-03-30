import React, { useContext, useEffect, useState } from 'react';
import Header from '../../other/Header';
import TaskList from '../TaskList/TaskList';
import { AuthContext } from '../../context/AuthProvider';
import TaskPendingModal from './TaskPendingModal';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const EmployeeDashboard = ({ data, changeUser }) => {
  const [userData, setUserData] = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false); // TaskPendingModal state
  const [showProgress, setShowProgress] = useState(false); // Progress Pie Chart state
  const [loading, setLoading] = useState(true); // Preloader state

  useEffect(() => {
    if (userData) {
      const updatedEmployee = userData.find((emp) => emp.id === data.id);
      if (updatedEmployee) {
        const updatedData = { role: 'employee', data: updatedEmployee };
        localStorage.setItem('loggedInUser', JSON.stringify(updatedData));
      }
    }

    // Show Task Pending Modal when the employee logs in
    setShowModal(true);

    // Set loading state to false after a short delay
    setTimeout(() => setLoading(false), 3000);

    // Timeout to show modal after 30 seconds
    const modalTimeout = setTimeout(() => {
      setShowModal(true); // Show the modal after 30 seconds
    }, 30000);

    // Cleanup timeout on component unmount
    return () => clearTimeout(modalTimeout);
  }, [userData, data.id]);

  const currentEmployeeData =
    userData?.find((emp) => emp.id === data.id) || data;

  // Handle task completion
  const handleTaskCompletion = (taskId) => {
    const updatedTasks = currentEmployeeData.tasks.map((task) => {
      if (task.id === taskId) {
        task.status = 'completed'; // Update task status to completed
      }
      return task;
    });

    let completedCount = 0;
    let failedCount = 0;
    let activeCount = 0;

    updatedTasks.forEach((task) => {
      if (task.status === 'completed') completedCount++;
      if (task.status === 'failed') failedCount++;
      if (task.status === 'active') activeCount++;
    });

    const updatedEmployee = {
      ...currentEmployeeData,
      tasks: updatedTasks,
      taskCounts: {
        completed: completedCount,
        newTask: 0, // Pending tasks set to 0
        failed: failedCount,
        active: activeCount,
      },
    };

    // Update the context with new task counts
    setUserData((prevData) =>
      prevData.map((emp) => (emp.id === data.id ? updatedEmployee : emp))
    );

    // Update localStorage if necessary
    const updatedData = { role: 'employee', data: updatedEmployee };
    localStorage.setItem('loggedInUser', JSON.stringify(updatedData));
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Performance stats for PieChart (ensure minimum 35% values)
  const rawPerformanceData = [
    { name: 'Communication', value: currentEmployeeData.performance?.Communication || Math.floor(Math.random() * 100) },
    { name: 'Client Satisfaction', value: currentEmployeeData.performance?.['Client Satisfaction'] || Math.floor(Math.random() * 100) },
    { name: 'Problem Solving', value: currentEmployeeData.performance?.['Problem Solving'] || Math.floor(Math.random() * 100) },
    { name: 'Deadline Driven', value: currentEmployeeData.performance?.['Deadline Driven'] || Math.floor(Math.random() * 100) },
  ];

  const minThreshold = 35;
  let totalValue = rawPerformanceData.reduce((sum, item) => sum + item.value, 0);
  let adjustedData = rawPerformanceData.map((item) => ({
    ...item,
    value: item.value < minThreshold ? minThreshold : item.value,
  }));

  let adjustedTotal = adjustedData.reduce((sum, item) => sum + item.value, 0);
  adjustedData = adjustedData.map((item) => ({
    ...item,
    value: Math.round((item.value / adjustedTotal) * 100), // Normalize to percentage
  }));

  const COLORS = ['#4CAF50', '#FF9800', '#03A9F4', '#E91E63'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] text-white px-4 sm:px-6 md:px-10 lg:px-16">
      {/* Preloader Section */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="text-center text-white">
            <p className="text-2xl sm:text-3xl font-semibold">Welcome, {currentEmployeeData.name}!</p>
            <p className="mt-2 text-lg sm:text-xl">Loading your dashboard...</p>
          </div>
        </div>
      )}

      {/* Header Section */}
      <header className="bg-[#202225] shadow-lg p-4 sm:p-6 rounded-lg mb-6">
        <Header data={currentEmployeeData} changeUser={changeUser} />
      </header>

      {/* Task Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#2b2d31] p-6 rounded-lg shadow-md text-center transition-all transform hover:scale-105 hover:shadow-xl">
          <h3 className="text-xl font-semibold text-indigo-400">Completed Tasks</h3>
          <p className="mt-2 text-4xl font-bold text-green-500">{currentEmployeeData.taskCounts.completed || 0}</p>
        </div>
        <div className="bg-[#2b2d31] p-6 rounded-lg shadow-md text-center transition-all transform hover:scale-105 hover:shadow-xl">
          <h3 className="text-xl font-semibold text-indigo-400">Active Tasks</h3>
          <p className="mt-2 text-4xl font-bold text-blue-500">{currentEmployeeData.taskCounts.active || 0}</p>
        </div>
        <div className="bg-[#2b2d31] p-6 rounded-lg shadow-md text-center transition-all transform hover:scale-105 hover:shadow-xl">
          <h3 className="text-xl font-semibold text-indigo-400">Failed Tasks</h3>
          <p className="mt-2 text-4xl font-bold text-red-500">{currentEmployeeData.taskCounts.failed || 0}</p>
        </div>
      </div>

      {/* Button to view progress stats placed here */}
      <div className="text-center mb-6">
        <button
          onClick={() => setShowProgress(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition-all transform hover:scale-105"
        >
          View Progress
        </button>
      </div>

      {/* Task List Section */}
      <section className="bg-[#2b2d31] p-6 rounded-lg shadow-md transition-all transform">
        {/* <h2 className="text-2xl font-bold text-gray-100 border-b border-gray-600 pb-4 mb-6">Your Tasks</h2> */}
        <TaskList data={currentEmployeeData} onTaskComplete={handleTaskCompletion} />
      </section>

      {/* Performance Overview Modal */}
      {showProgress && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 px-4 sm:px-0">
          <div className="bg-[#1e1e2f] p-6 pt-10 rounded-lg shadow-xl border border-gray-700 relative w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto overflow-hidden min-h-[400px] sm:min-h-[450px] md:min-h-[500px]">
            <button
              onClick={() => setShowProgress(false)} // Close modal
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-300 transition-all duration-200 text-xl"
            >
              ✖
            </button>
            <h3 className="text-lg font-semibold text-center text-white mb-4">Performance Overview</h3>
            <div className="mt-6 w-full">
              <ResponsiveContainer width="100%" height={270}>
                <PieChart>
                  <Pie
                    data={adjustedData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {adjustedData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" height={50} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Task Pending Modal */}
      {showModal && <TaskPendingModal onClose={closeModal} />}
    </div>
  );
};

export default EmployeeDashboard;