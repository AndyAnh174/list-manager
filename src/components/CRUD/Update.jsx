import React, { useState } from "react";
import { studentApi } from '../../api/student';
import { motion } from 'framer-motion';
import TinhTable from './TinhTable';

const Update = ({ navigateBack, navigateHome }) => {
  const [query, setQuery] = useState({ SBD: "", Year: "" });
  const [studentData, setStudentData] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setError(null);
      
      if (!query.SBD || !query.Year) {
        setError('Vui lòng nhập đầy đủ Số Báo Danh và Năm thi');
        return;
      }

      const data = await studentApi.getStudent(query.SBD);
      const filteredData = data.filter(student => student['Năm'].toString() === query.Year);
      
      if (filteredData.length > 0) {
        setStudentData(filteredData[0]);
        setUpdatedData(filteredData[0]);
      } else {
        setError('Không tìm thấy thí sinh với thông tin này');
      }
    } catch (error) {
      setError('Lỗi khi tìm kiếm: ' + error.message);
    }
  };

  const handleFieldChange = (field, value) => {
    setUpdatedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      if (!query.Year) {
        setError('Vui lòng nhập năm.');
        return;
      }

      const changes = {};
      Object.keys(updatedData).forEach(key => {
        if (['Toán', 'Văn', 'Lý', 'Hóa', 'Sinh', 'Ngoại ngữ', 'Lịch sử', 'Địa lý', 'GDCD'].includes(key)) {
          changes[key] = updatedData[key] === '' ? null : Number(updatedData[key]);
        } else {
          changes[key] = updatedData[key];
        }
      });

      if (Object.keys(changes).length === 0) {
        setError('Không có thông tin nào được thay đổi');
        return;
      }

      const updateSBD = changes['Số Báo Danh'] || query.SBD;
      const updateYear = changes['Năm'] || query.Year;

      await studentApi.updateStudent(updateSBD, updateYear, changes);
      alert('Cập nhật thành công!');
      navigateHome();
    } catch (error) {
      setError('Lỗi khi cập nhật: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h1 className="text-2xl font-bold mb-6">Cập Nhật Thông Tin Thí Sinh</h1>
          {/* Form tìm kiếm */}
          {!studentData && (
            <div className="w-full max-w-md">
              <div className="mb-4">
                <label className="block mb-2">Số Báo Danh: <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={query.SBD}
                  onChange={(e) => setQuery({ ...query, SBD: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Năm: <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={query.Year}
                  onChange={(e) => setQuery({ ...query, Year: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button
                onClick={handleSearch}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
              >
                Tìm kiếm
              </button>
            </div>
          )}

          {/* Hiển thị lỗi */}
          {error && (
            <div className="w-full max-w-md mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Form cập nhật */}
          {studentData && updatedData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full max-w-2xl"
            >
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold mb-4">Thông tin thí sinh</h3>
                {Object.entries(updatedData).map(([field, value]) => (
                  <div key={field} className="mb-4">
                    <label className="block mb-2">{field}:</label>
                    <input
                      type="text"
                      value={value || ''}
                      onChange={(e) => handleFieldChange(field, e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                ))}
                <button
                  onClick={handleUpdate}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 mt-4"
                >
                  Cập nhật
                </button>
              </motion.div>
            </motion.div>
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
        
        <div>
          <TinhTable />
        </div>
      </div>
    </div>
  );
};

export default Update;
