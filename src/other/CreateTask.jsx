import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { showSuccessToast, showErrorToast } from '../utils/toastConfig';

const CreateTask = () => {
  const initialState = {
    taskTitle: '',
    taskDescription: '',
    taskDate: '',
    deadlineDate: '',
    assignTo: '',
    category: '',
    attachedFile: null, // Store File Data Here
    priority: 0,
  };

  const [formData, setFormData] = useState(initialState);
  const [userData, setUserData] = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false); // Manual popup state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Convert File to Base64 for Storage
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          attachedFile: {
            name: file.name,
            type: file.type,
            data: reader.result, // Convert to Base64
          },
        }));
      };
    }
  };

  const handlePriorityChange = (priority) => {
    setFormData((prev) => ({
      ...prev,
      priority,
    }));
  };

  // ✅ Function to Generate Unique Task ID
  const generateUniqueTaskId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  };

  const createNewTask = () => ({
    id: generateUniqueTaskId(), // ✅ Assign Unique Task ID
    taskTitle: formData.taskTitle,
    taskDate: formData.taskDate,
    deadlineDate: formData.deadlineDate,
    category: formData.category,
    taskDescription: formData.taskDescription,
    priority: formData.priority,
    active: false,
    newTask: true,
    failed: false,
    completed: false,
    attachedFile: formData.attachedFile, // Store file properly
  });

  const submitHandler = (e) => {
    e.preventDefault();

    try {
      const employee = userData.find((emp) => emp.firstName === formData.assignTo);
      if (!employee) {
        showErrorToast('Employee not found!');
        return;
      }

      const updatedData = userData.map((emp) => {
        if (emp.firstName === formData.assignTo) {
          return {
            ...emp,
            tasks: [...emp.tasks, createNewTask()],
            taskCounts: {
              ...emp.taskCounts,
              newTask: emp.taskCounts.newTask + 1,
            },
          };
        }
        return emp;
      });

      setUserData(updatedData);

      // ✅ Show manual popup
      setShowPopup(true);
      console.log('Task created successfully!');
      showSuccessToast('Task created successfully!');

      // Reset form data
      setTimeout(() => setFormData(initialState), 1000);
    } catch (error) {
      showErrorToast('Failed to create task. Please try again.');
    }
  };

  return (
    <div className="bg-[#212121] p-8 rounded-lg shadow-lg mt-6 relative">
      <h2 className="text-2xl font-bold text-gray-200 mb-2 text-center">Create a New Task</h2>
      {/* <p className="text-sm text-gray-400 text-center mb-6">(Task must be unique)</p> */}

      <form onSubmit={submitHandler} className="space-y-6">

        {/* Task Title */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Task Title</label>
          <input
            name="taskTitle"
            value={formData.taskTitle}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg border border-gray-700 bg-[#333] text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            placeholder="Task Title"
            required
          />
        </div>

        {/* Assign To */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Assign To</label>
          <select
            name="assignTo"
            value={formData.assignTo}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg border border-gray-700 bg-[#333] text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="" disabled>Select an employee</option>
            {userData.map((emp) => (
              <option key={emp.id} value={emp.firstName}>
                {emp.firstName} {emp.lastName}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <textarea
            name="taskDescription"
            value={formData.taskDescription}
            onChange={handleInputChange}
            className="w-full p-3 h-32 rounded-lg border border-gray-700 bg-[#333] text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Describe the task"
            required
          />
        </div>

        {/* Assign Date & Deadline Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Assign Date</label>
            <input
              name="taskDate"
              value={formData.taskDate}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg border border-gray-700 bg-[#333] text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="date"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Deadline Date</label>
            <input
              name="deadlineDate"
              value={formData.deadlineDate}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg border border-gray-700 bg-[#333] text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="date"
              required
            />
          </div>
        </div>

        {/* Attach File */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Attach File</label>
          <input
            name="attachedFile"
            onChange={handleFileChange}
            className="w-full p-3 rounded-lg border border-gray-700 bg-[#333] text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="file"
          />
          {formData.attachedFile && (
            <p className="text-gray-400 text-sm mt-1">Selected file: {formData.attachedFile.name}</p>
          )}
        </div>

        {/* Priority Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`text-2xl ${formData.priority >= star ? 'text-yellow-400' : 'text-gray-500'}`}
                onClick={() => handlePriorityChange(star)}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-all">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
