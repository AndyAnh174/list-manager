import React, { useState } from "react";
import { studentApi } from '../../api/student';
import { motion } from 'framer-motion';

const Read = ({ navigateBack, navigateHome }) => {
  const [query, setQuery] = useState({ SBD: "", Year: "" });
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setError(null); // Reset error message
      const data = await studentApi.getStudent(query.SBD);
      if (query.Year) {
        const filteredData = data.filter(student => 
          student['Năm'].toString() === query.Year
        );
        setResults(filteredData);
      } else {
        setResults(data);
      }
    } catch (error) {
      setError(error.message);
      setResults(null);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Tìm Thí Sinh</h2>
      <div className="flex gap-4 mb-4">
        <div>
          <label className="mr-2">Số Báo Danh:</label>
          <input
            type="text"
            value={query.SBD}
            onChange={(e) => setQuery({ ...query, SBD: e.target.value })}
            className="p-2 border rounded"
          />
        </div>
        <div>
          <label className="mr-2">Năm thi:</label>
          <input
            type="text"
            value={query.Year}
            onChange={(e) => setQuery({ ...query, Year: e.target.value })}
            className="p-2 border rounded"
            placeholder="Không bắt buộc"
          />
        </div>
      </div>
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 mb-4"
      >
        Tìm kiếm
      </button>

      {/* Hiển thị thông báo lỗi */}
      {error && (
        <div className="w-full max-w-4xl mb-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Lỗi! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      )}

      {/* Hiển thị kết quả tìm kiếm */}
      {results && Array.isArray(results) && results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-lg shadow-lg"
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-600">
              <tr>
                {Object.keys(results[0]).map((key) => (
                  <th key={key} className="px-4 py-2 text-left">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((student, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  {Object.values(student).map((value, i) => (
                    <td key={i} className="px-4 py-2 border-t">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* Hiển thị thông báo không tìm thấy */}
      {results && Array.isArray(results) && results.length === 0 && (
        <div className="w-full max-w-4xl">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">
              Không tìm thấy thí sinh với thông tin tìm kiếm này
            </span>
          </div>
        </div>
      )}

      <div className="flex space-x-4 mt-8">
        <button
          onClick={navigateBack}
          className="px-4 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600"
        >
          Quay lại
        </button>
        <button
          onClick={navigateHome}
          className="px-4 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600"
        >
          Trang chủ
        </button>
      </div>
    </div>
  );
};

export default Read;
