import React from 'react';

const CompleteTask = ({ element }) => {
  return (
    <div className="w-full max-w-sm bg-[#252525] border-2 border-green-900 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-200">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <span className="px-3 py-1 bg-green-900/50 text-green-300 rounded-lg text-xs sm:text-sm font-medium">
          {element.category}
        </span>
        <span className="text-xs sm:text-sm text-gray-400">{element.taskDate}</span>
      </div>

      {/* Task Title & Description */}
      <h2 className="mt-4 text-lg sm:text-xl font-semibold text-gray-100">{element.taskTitle}</h2>
      <p className="mt-2 text-sm sm:text-base text-gray-300">{element.taskDescription}</p>

      {/* Deadline Info */}
      <div className="text-xs sm:text-sm text-gray-400 mt-2">
        <p>
          <strong>Deadline:</strong> {element.deadlineDate || 'No deadline set'}
        </p>
      </div>

      {/* Status Indicator */}
      <div className="mt-5">
        <div className="w-full bg-green-900/50 text-green-300 text-center py-2 rounded-lg font-medium text-sm sm:text-base">
          Completed
        </div>
      </div>
    </div>
  );
};

export default CompleteTask;
