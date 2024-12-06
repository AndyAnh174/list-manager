import React, { useState } from "react";
import { studentApi } from '../../api/student';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';

const Delete = ({ navigateBack, navigateHome }) => {
  const [numberToDelete, setNumberToDelete] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputs, setInputs] = useState([]);
  const [currentInput, setCurrentInput] = useState({ SBD: "", Year: "" });
  const [error, setError] = useState(null);

  const handleFieldChange = (field, value) => {
    setCurrentInput((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError(null); // Reset error when user starts typing
  };

  const handleNext = () => {
    if (!currentInput.Year) {
      setError('Vui lòng nhập năm.');
      return;
    }
    if (currentIndex < numberToDelete) {
      setInputs((prev) => [...prev, currentInput]);
      setCurrentInput({ SBD: "", Year: "" });
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    const confirmDelete = window.confirm('Bạn có chắc muốn xóa thí sinh này không?');
    if (!confirmDelete) return;

    try {
      const allInputs = [...inputs, currentInput];
      
      for (const input of allInputs) {
        await studentApi.deleteStudent(input.SBD, input.Year);
      }
      
      alert('Đã xóa thành công tất cả thí sinh!');
      navigateHome();
    } catch (error) {
      alert('Lỗi khi xóa thí sinh: ' + error.message);
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h2 
        className="text-3xl font-bold mb-8 text-gray-800"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        Xóa Thí Sinh
      </motion.h2>

      {currentIndex === 0 && (
        <motion.div 
          className="bg-white rounded-lg shadow-lg p-8 mb-6 w-full max-w-md"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          <label className="block text-lg mb-4">
            Bạn muốn xóa bao nhiêu thí sinh?
            <input
              type="number"
              value={numberToDelete}
              onChange={(e) => setNumberToDelete(Number(e.target.value))}
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-red-300 transition-all"
              min="0"
            />
          </label>
        </motion.div>
      )}

      {currentIndex < numberToDelete && (
        <motion.div 
          className="w-full max-w-md"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
        >
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-6 text-center">
              Thí Sinh {currentIndex + 1}/{numberToDelete}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SBD:
                </label>
                <input
                  type="text"
                  value={currentInput.SBD}
                  onChange={(e) => handleFieldChange("SBD", e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-300 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Năm:
                </label>
                <input
                  type="text"
                  value={currentInput.Year}
                  onChange={(e) => handleFieldChange("Year", e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-300 transition-all"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
            </div>
            <motion.button
              onClick={handleNext}
              className="w-full mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Tiếp theo
            </motion.button>
          </div>
        </motion.div>
      )}

      {currentIndex === numberToDelete && numberToDelete > 0 && (
        <motion.button
          onClick={handleSubmit}
          className="px-8 py-4 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-colors flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FaTrash className="text-lg" />
          Xóa Thí Sinh
        </motion.button>
      )}

      <div className="flex gap-4 mt-8">
        <motion.button
          onClick={navigateBack}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Quay lại
        </motion.button>
        <motion.button
          onClick={navigateHome}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Trang chủ
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Delete;
