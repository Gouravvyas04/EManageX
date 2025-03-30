import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { updateTaskStatus } from './taskUtils';
import { showSuccessToast, showFailureToast } from '../../utils/toastConfig';

const AcceptTask = ({ element }) => {
  const [userData, setUserData] = useContext(AuthContext);

  const handleStatusChange = (status) => {
    const updatedData = updateTaskStatus(userData, element, status);
    setUserData(updatedData);
    localStorage.setItem('employees', JSON.stringify(updatedData));

    if (status === 'completed') {
      showSuccessToast('Task completed successfully! 🎉');
    } else {
      showFailureToast('Task marked as failed');
    }
  };

  return (
    <div className="flex flex-col bg-[#1e1e1e] border-2 border-yellow-900 rounded-xl p-5 hover:shadow-lg transition-all duration-200 overflow-hidden w-full min-h-[180px]">
      {/* Task Category & Date */}
      <div className="flex justify-between items-center">
        <span className="px-3 py-1 bg-yellow-900/50 text-yellow-300 rounded-lg text-sm font-medium">
          {element.category}
        </span>
        <span className="text-sm text-gray-400">{element.taskDate}</span>
      </div>

      {/* Task Title (Truncated if long) */}
      <h2 className="mt-4 text-lg font-semibold text-gray-100 truncate">{element.taskTitle}</h2>

      {/* Task Description (Limited to 3 lines) */}
      <p className="mt-2 text-sm text-gray-300 line-clamp-3 break-words">
        {element.taskDescription}
      </p>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-5">
        <button
          onClick={() => handleStatusChange('completed')}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
        >
          Complete
        </button>
        <button
          onClick={() => handleStatusChange('failed')}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
        >
          Failed
        </button>
      </div>
    </div>
  );
};

export default AcceptTask;