import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { X } from "lucide-react";
import { getLocalStorage } from "../utils/localStorage"; // Ensure correct path

const COLORS = { completed: "#00C49F", failed: "#FF4444", active: "#4A90E2" };

// Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#1e1e2f] text-white p-3 rounded-lg shadow-lg border border-gray-700">
                <p className="font-semibold text-lg">{payload[0].payload.fullName}</p>
                <p className="text-green-400">✅ Completed: {payload[0].payload.completed}</p>
                <p className="text-red-400">❌ Failed: {payload[0].payload.failed}</p>
                <p className="text-blue-400">🚀 Active: {payload[0].payload.active}</p>
            </div>
        );
    }
    return null;
};

const EmployeeProgressGraph = ({ onClose }) => {
    const [employeeData, setEmployeeData] = useState([]);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

    // Handle screen resizing
    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const { employees } = getLocalStorage();
        if (employees) {
            setEmployeeData(
                employees.map(emp => ({
                    fullName: emp.firstName, 
                    displayName: isSmallScreen ? emp.firstName.split(" ")[0] : emp.firstName, // Adjust based on screen size
                    completed: emp.taskCounts.completed,
                    failed: emp.taskCounts.failed,
                    active: emp.taskCounts.active
                }))
            );
        }
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fade-in px-4">
            <div className="bg-[#222636] p-5 sm:p-6 rounded-lg shadow-xl w-full max-w-[95%] sm:max-w-[85%] md:max-w-[70%] lg:max-w-[60%] relative animate-slide-up">
                {/* Close Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-300 transition-all duration-200"
                >
                    <X size={24} />
                </button>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-white text-center mb-4">
                    Employee Task Progress
                </h2>

                {/* Bar Chart */}
                <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                            data={employeeData} 
                            barGap={5} 
                            margin={{ top: 20, right: 20, left: 0, bottom: 50 }} // Extra bottom space for names
                        >
                            <XAxis 
                                dataKey="displayName" // Show first name or full name dynamically
                                stroke="white"
                                tick={{ fontSize: isSmallScreen ? 10 : 12 }} 
                                angle={isSmallScreen ? -30 : 0} // Tilt names if needed
                                textAnchor="middle" // Keep names aligned
                                interval={0} // Show all names
                            />
                            <YAxis stroke="white" tick={{ fontSize: 12 }} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
                            <Legend wrapperStyle={{ fontSize: "12px" }} />

                            {/* Animated Bars */}
                            <Bar
                                dataKey="completed"
                                stackId="a"
                                fill={COLORS.completed}
                                name="Completed Tasks"
                                radius={[8, 8, 0, 0]}
                                animationBegin={300}
                                animationDuration={1000}
                                animationEasing="ease-in-out"
                            />
                            <Bar
                                dataKey="failed"
                                stackId="a"
                                fill={COLORS.failed}
                                name="Failed Tasks"
                                radius={[8, 8, 0, 0]}
                                animationBegin={600}
                                animationDuration={1200}
                                animationEasing="ease-in-out"
                            />
                            <Bar
                                dataKey="active"
                                stackId="a"
                                fill={COLORS.active}
                                name="Active Tasks"
                                radius={[8, 8, 0, 0]}
                                animationBegin={900}
                                animationDuration={1400}
                                animationEasing="ease-in-out"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProgressGraph;
