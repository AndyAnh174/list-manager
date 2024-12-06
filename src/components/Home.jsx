import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaDatabase, FaChartBar, FaBroom } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  const handleCRUD = () => {
    navigate('/crud');
  };

  const handleChart = () => {
    navigate('/chart');
  };

  const handleClean = () => {
    navigate('/clean');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.button
        onClick={handleCRUD}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className="group relative flex items-center justify-center gap-3 px-12 py-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        <FaDatabase className="text-2xl" />
        <span className="text-xl font-semibold">CRUD</span>
      </motion.button>

      <motion.button
        onClick={handleChart}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className="group relative flex items-center justify-center gap-3 px-12 py-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        <FaChartBar className="text-2xl" />
        <span className="text-xl font-semibold">Chart</span>
      </motion.button>

      <motion.button
        onClick={handleClean}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className="group relative flex items-center justify-center gap-3 px-12 py-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        <FaBroom className="text-2xl" />
        <span className="text-xl font-semibold">Clean</span>
      </motion.button>
    </motion.div>
  );
};

export default Home;
