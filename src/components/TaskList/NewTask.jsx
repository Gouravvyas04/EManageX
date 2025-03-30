import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { updateTaskStatus } from './taskUtils';
import { showSuccessToast } from '../../utils/toastConfig';

const NewTask = ({ element }) => {
  const [userData, setUserData] = useContext(AuthContext);

  const handleAcceptTask = () => {
    const updatedData = updateTaskStatus(userData, element, 'active');
    setUserData(updatedData);
    localStorage.setItem('employees', JSON.stringify(updatedData));
    showSuccessToast('Task accepted successfully!');
  };

  // Function to render priority stars
  const renderPriorityStars = (priority) => (
    <div className="flex items-center mt-2">
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={`text-lg md:text-xl ${index < priority ? 'text-yellow-400' : 'text-gray-500'}`}
        >
          ★
        </span>
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-[95%] md:max-w-[400px] bg-[#1E293B] border-2 border-[#4F46E5] rounded-xl p-4 md:p-6 hover:shadow-lg transition-all duration-200 mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <span className="px-3 py-1 bg-[#4F46E5]/50 text-[#A5B4FC] rounded-lg text-xs sm:text-sm font-medium">
          {element.category}
        </span>
        <span className="text-xs sm:text-sm text-[#94A3B8]">
          <strong>Assigned:</strong> {element.taskDate}
        </span>
      </div>

      {/* Task Title & Description */}
      <h2 className="mt-3 text-lg md:text-xl font-semibold text-[#E2E8F0] break-words">{element.taskTitle}</h2>
      <p className="mt-2 text-sm md:text-base text-[#CBD5E1] break-words">{element.taskDescription}</p>

      {/* Priority Display */}
      <div className="mt-3">
        <strong className="text-sm md:text-base text-[#A5B4FC]">Priority:</strong>
        {renderPriorityStars(element.priority)}
      </div>

      {/* Deadline Display */}
      <div className="text-xs md:text-sm text-[#94A3B8] mt-2">
        <p>
          <strong>Deadline:</strong> {element.deadlineDate || 'No deadline set'}
        </p>
      </div>

      {/* Accept Button */}
      <div className="mt-5">
        <button
          onClick={handleAcceptTask}
          className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm md:text-base"
        >
          Accept Task
        </button>
      </div>
    </div>
  );
};

export default NewTask;
