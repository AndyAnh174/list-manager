import React, { useState } from "react";
import { studentApi } from '../../api/student';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCheck } from 'react-icons/fa';
import TinhTable from './TinhTable';

const Create = ({ navigateBack, navigateHome }) => {
  const [number, setNumber] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputs, setInputs] = useState([]);
  const [currentInput, setCurrentInput] = useState({
    SBD: "",
    Toán: "",
    Văn: "",
    Lý: "",
    Sinh: "",
    "Ngoại ngữ": "",
    Year: "",
    Hóa: "",
    "Lịch sử": "",
    "Địa lý": "",
    GDCD: "",
    MaTinh: "",
  });

  const handleFieldChange = (field, value) => {
    setCurrentInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (currentIndex < number) {
      setInputs((prev) => [...prev, currentInput]);
      setCurrentInput({
        SBD: "",
        Toán: "",
        Văn: "",
        Lý: "",
        Sinh: "",
        "Ngoại ngữ": "",
        Year: "",
        Hóa: "",
        "Lịch sử": "",
        "Địa lý": "",
        GDCD: "",
        MaTinh: "",
      });
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const allInputs = [...inputs, currentInput];
      
      for (const student of allInputs) {
        await studentApi.createStudent(student);
      }
      
      alert('Đã thêm thành công tất cả thí sinh!');
      navigateHome();
    } catch (error) {
      alert('Lỗi khi thêm thí sinh: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h1 className="text-2xl font-bold mb-6">Thêm Thí Sinh Mới</h1>
          {currentIndex === 0 && (
            <motion.div 
              className="bg-white rounded-lg shadow-lg p-8 mb-6 w-full max-w-md"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <label className="block text-lg mb-4">
                Bạn muốn tạo bao nhiêu thí sinh?
                <input
                  type="number"
                  value={number}
                  onChange={(e) => setNumber(Number(e.target.value))}
                  className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 transition-all"
                  min="0"
                />
              </label>
            </motion.div>
          )}

          {currentIndex < number && (
            <motion.div 
              className="w-full max-w-2xl"
              initial={{ x: 100 }}
              animate={{ x: 0 }}
            >
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-6 text-center">
                  Thí Sinh {currentIndex + 1}/{number}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(currentInput).map((field) => (
                    <div key={field} className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field}:
                      </label>
                      <input
                        type="text"
                        value={currentInput[field]}
                        onChange={(e) => handleFieldChange(field, e.target.value)}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 transition-all"
                      />
                    </div>
                  ))}
                </div>
                <motion.button
                  onClick={handleNext}
                  className="w-full mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaArrowRight className="text-lg" />
                  Tiếp theo
                </motion.button>
              </div>
            </motion.div>
          )}

          {currentIndex === number && number > 0 && (
            <motion.button
              onClick={handleSubmit}
              className="px-8 py-4 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FaCheck className="text-lg" />
              Hoàn tất
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
        </div>
        
        <div>
          <TinhTable />
        </div>
      </div>
    </div>
  );
};

export default Create;
