import React, { useContext, useEffect, useState } from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";
import { AuthContext } from "../../context/AuthProvider";

const TaskList = ({ data, setData }) => {
  const [userData, setUserData] = useContext(AuthContext);
  const [countdown, setCountdown] = useState({});

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees"));
    if (storedEmployees && JSON.stringify(storedEmployees) !== JSON.stringify(userData)) {
      setUserData(storedEmployees);
    }
  }, [setUserData]);

  // Ensure task list updates correctly
  useEffect(() => {
    if (data.tasks) {
      localStorage.setItem("employees", JSON.stringify(userData));
    }
  }, [data.tasks, userData]);

  // Sort Tasks Properly
  const sortedTasks = (data?.tasks || []).slice().sort((a, b) => {
    if (a.newTask && !b.newTask) return -1;
    if (!a.newTask && b.newTask) return 1;
    if (a.active && !b.active) return -1;
    if (!a.active && b.active) return 1;
    return a.priority - b.priority;
  });

  // ✅ Properly Updates Task Data Without Overwriting Previous Tasks
  const handleTaskUpdate = (updatedTask) => {
    setData((prevData) => {
      const updatedTasks = prevData.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      return { ...prevData, tasks: updatedTasks };
    });

    // ✅ Ensure localStorage updates correctly
    const updatedUserData = userData.map((user) => {
      if (user.id === data.id) {
        return { ...user, tasks: sortedTasks };
      }
      return user;
    });
    setUserData(updatedUserData);
    localStorage.setItem("employees", JSON.stringify(updatedUserData));
  };

  // ✅ Ensure Completed Tasks Are Not Undone
  const calculateCountdown = () => {
    const newCountdown = {};
    const today = new Date().setHours(0, 0, 0, 0);

    sortedTasks.forEach((task) => {
      if (task.deadlineDate) {
        const deadline = new Date(task.deadlineDate).setHours(0, 0, 0, 0);
        const diff = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

        if (!task.completed && !task.failed) {
          if (diff === 2) newCountdown[task.deadlineDate] = "2 days left for the deadline!";
          else if (diff === 1) newCountdown[task.deadlineDate] = "Tomorrow is the deadline!";
          else if (diff === 0) newCountdown[task.deadlineDate] = "Today is the deadline!";
          else if (diff < 0) newCountdown[task.deadlineDate] = "Deadline Passed!";
        }
      }
    });

    setCountdown(newCountdown);
  };

  useEffect(() => {
    calculateCountdown();
    const interval = setInterval(calculateCountdown, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [data.tasks]);

  const getBlinkingClass = (task) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const deadline = new Date(task.deadlineDate).setHours(0, 0, 0, 0);
    const diff = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

    return diff === 0 && !task.completed && !task.failed ? "blink-border-red" : "";
  };

  const renderTask = (task) => {
    if (task.active) return <AcceptTask element={task} key={task.id} updateTask={handleTaskUpdate} />;
    if (task.newTask) return <NewTask element={task} key={task.id} updateTask={handleTaskUpdate} />;
    if (task.completed) return <CompleteTask element={task} key={task.id} />;
    if (task.failed) return <FailedTask element={task} key={task.id} />;
    return null;
  };

  return (
    <>
      <style>
        {`
          @keyframes blink-border-red {
            0% { border: 4px solid rgba(239, 83, 80, 1); }
            50% { border: 4px solid rgba(239, 83, 80, 0.3); }
            100% { border: 4px solid rgba(239, 83, 80, 1); }
          }

          .blink-border-red {
            animation: blink-border-red 0.8s infinite alternate ease-in-out;
          }
        `}
      </style>

      <div className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] p-6 sm:p-8 rounded-xl shadow-lg w-full">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 border-b border-gray-600 pb-3">
          Your Tasks
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 auto-rows-fr">
          {sortedTasks.length > 0 ? (
            sortedTasks.map((task, index) => (
              <div
                key={task.id || `task-${index}`}
                className={`relative p-5 sm:p-6 rounded-lg bg-[#334155] shadow-md 
                hover:shadow-xl transition-all transform hover:-translate-y-1 
                hover:scale-105 overflow-hidden min-h-[180px] flex flex-col 
                justify-between border border-gray-600 ${getBlinkingClass(task)}`}
              >
                {renderTask(task)}

                <span
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${task.active ? "bg-blue-500" : task.newTask ? "bg-yellow-500" : task.completed ? "bg-green-500" : "bg-red-500"
                    } text-white`}
                >
                  {task.active ? "Active" : task.newTask ? "New" : task.completed ? "Completed" : "Failed"}
                </span>

                <p className="text-lg font-semibold text-white mt-4 truncate">{task.name}</p>
                <p className="text-gray-300 text-sm line-clamp-3 break-words">{task.description}</p>

                <div className="mt-4 text-center text-xs sm:text-sm text-[#94A3B8] border-t border-gray-700 pt-2">
                  <strong>Deadline:</strong> {task.deadlineDate || "No deadline set"}
                  {countdown[task.deadlineDate] && (
                    <p className={`mt-1 font-semibold ${countdown[task.deadlineDate] === "Deadline Passed!" ? "text-red-500" : "text-yellow-400"}`}>
                      {countdown[task.deadlineDate]}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-base sm:text-lg col-span-full text-center">No tasks assigned yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskList;
