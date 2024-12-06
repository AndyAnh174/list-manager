import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaFileDownload } from 'react-icons/fa';
import { API_URL } from '../../config';

const CleanMain = ({ navigateToHome }) => {
  const [selectedOption, setSelectedOption] = useState('1');
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClean = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/clean/${selectedOption}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', errorText);
        throw new Error(errorText || 'Có lỗi xảy ra khi làm sạch dữ liệu');
      }
      
      const result = await response.json();
      console.log('Server response:', result);
      
      if (!result.data) {
        throw new Error('Không nhận được dữ liệu từ server');
      }
      
      const blob = new Blob([result.data], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'Cleaned_Data.csv';
      
      document.body.appendChild(a);
      a.click();
      
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      setShowConfirm(false);
      
    } catch (err) {
      console.error('Error details:', err);
      setError(err.message || 'Có lỗi xảy ra khi làm sạch dữ liệu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Clean Data
          </h1>
          <button
            onClick={navigateToHome}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FaHome /> Về trang chủ
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Chọn nguồn dữ liệu để làm sạch:</h2>
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="w-full p-2 border rounded-lg mb-4"
            disabled={showConfirm || isLoading}
          >
            <option value="1">Update Data</option>
            <option value="2">Raw Data</option>
          </select>

          {!showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
              disabled={isLoading}
            >
              Tiếp tục
            </button>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-700">
                Bạn có chắc chắn muốn làm sạch dữ liệu từ {selectedOption === '1' ? 'Update Data' : 'Raw Data'}?
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleClean}
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    'Đang xử lý...'
                  ) : (
                    <>
                      <FaFileDownload /> Chắc chắn
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                  disabled={isLoading}
                >
                  Không
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CleanMain; 