import React from "react";
import { motion } from "framer-motion";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaHistory, FaHome, FaCheck } from 'react-icons/fa';

const CRUDMain = ({ 
  navigateToCreate, 
  navigateToRead, 
  navigateToUpdate, 
  navigateToDelete, 
  navigateToHistory, 
  navigateToHome 
}) => {
  const handleFinish = async () => {
    try {
        const response = await fetch('http://localhost:5000/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();

        // Tạo và tải file
        const blob = new Blob([result.data], { type: 'text/csv;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Updated_Data.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        // Hiển thị thông báo thành công
        alert('Đã lưu dữ liệu thành công!');

    } catch (error) {
        console.error('Error:', error);
        alert('Có lỗi xảy ra khi lưu dữ liệu: ' + error.message);
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
    },
    tap: { 
      scale: 0.95 
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 
        className="text-3xl font-bold mb-8 text-gray-800 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Quản lý thông tin học sinh
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={navigateToCreate}
          className="flex items-center justify-center gap-3 px-6 py-4 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
        >
          <FaPlus /> Thêm mới
        </motion.button>

        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={navigateToRead}
          className="flex items-center justify-center gap-3 px-6 py-4 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition-colors"
        >
          <FaSearch /> Xem
        </motion.button>

        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={navigateToUpdate}
          className="flex items-center justify-center gap-3 px-6 py-4 bg-yellow-500 text-white rounded-lg shadow-lg hover:bg-yellow-600 transition-colors"
        >
          <FaEdit /> Cập nhật
        </motion.button>

        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={navigateToDelete}
          className="flex items-center justify-center gap-3 px-6 py-4 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-colors"
        >
          <FaTrash /> Xóa
        </motion.button>

        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={navigateToHistory}
          className="flex items-center justify-center gap-3 px-6 py-4 bg-indigo-500 text-white rounded-lg shadow-lg hover:bg-indigo-600 transition-colors"
        >
          <FaHistory /> Xem Lịch Sử
        </motion.button>

        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={handleFinish}
          className="flex items-center justify-center gap-3 px-6 py-4 bg-purple-500 text-white rounded-lg shadow-lg hover:bg-purple-600 transition-colors"
        >
          <FaCheck /> Hoàn tất CRUD
        </motion.button>
      </div>

      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={navigateToHome}
        className="flex items-center justify-center gap-3 px-8 py-4 mt-8 bg-gray-500 text-white rounded-lg shadow-lg hover:bg-gray-600 transition-colors"
      >
        <FaHome /> Về trang chủ
      </motion.button>
    </motion.div>
  );
};

export default CRUDMain;
