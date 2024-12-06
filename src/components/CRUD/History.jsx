import React, { useState, useEffect } from "react";
import { studentApi } from '../../api/student';

const History = ({ navigateBack, navigateHome }) => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await studentApi.getHistory();
      setHistory(data);
    } catch (error) {
      setError('Lỗi khi tải lịch sử: ' + error.message);
    }
  };

  const formatTime = (timeStr) => {
    return new Date(timeStr).toLocaleString('vi-VN');
  };

  const formatOperation = (operation) => {
    switch (operation) {
      case 'CREATE': return 'Thêm mới';
      case 'READ': return 'Xem';
      case 'UPDATE': return 'Cập nhật';
      case 'DELETE': return 'Xóa';
      case 'FINISH': return 'Hoàn tất CRUD';
      default: return operation;
    }
  };

  const formatDetails = (record) => {
    if (!record || !record.operation) return 'Không có thông tin chi tiết';

    switch (record.operation) {
        case 'CREATE':
            if (record.data) {
                return `Thêm thí sinh SBD: ${record.data.SBD || 'N/A'}, Năm: ${record.data.Year || 'N/A'}`;
            }
            return 'Thêm thí sinh mới';
            
        case 'READ':
            if (record.sbd) {
                return `Xem thí sinh SBD: ${record.sbd}`;
            }
            return 'Xem thí sinh';
            
        case 'UPDATE':
            if (record.data) {
                return `Cập nhật thí sinh SBD: ${record.data.SBD || record.data.old?.SBD || 'N/A'}, Năm: ${record.data.Year || record.data.old?.Year || 'N/A'}`;
            }
            return 'Cập nhật thí sinh';
            
        case 'DELETE':
            if (record.data) {
                return `Xóa thí sinh SBD: ${record.data.SBD || 'N/A'}, Năm: ${record.data.Year || 'N/A'}`;
            }
            return 'Xóa thí sinh';
            
        case 'FINISH':
            return 'Đã tạo file Updated_Data.csv';
            
        default:
            return 'Không có thông tin chi tiết';
    }
  };

  const handleClearHistory = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử?')) {
      try {
        await studentApi.clearHistory();
        setHistory([]);
        setError(null);
      } catch (error) {
        setError('Lỗi khi xóa lịch sử: ' + error.message);
      }
    }
  };

  const handleDeleteHistoryItem = async (index) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa mục lịch sử này?')) {
      try {
        await studentApi.clearHistoryItem(index);
        // Cập nhật state sau khi xóa
        setHistory(prevHistory => prevHistory.filter((_, i) => i !== index));
      } catch (error) {
        setError('Lỗi khi xóa mục lịch sử: ' + error.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Lịch Sử Thao Tác</h2>

      <div className="w-full max-w-4xl mb-4 flex justify-end">
        <button
          onClick={handleClearHistory}
          className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
        >
          Xóa Tất Cả Lịch Sử
        </button>
      </div>

      {error && (
        <div className="w-full max-w-4xl mb-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Lỗi! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      )}

      {history.length > 0 ? (
        <div className="w-full max-w-4xl">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">Thời gian</th>
                  <th className="px-4 py-2 text-left">Thao tác</th>
                  <th className="px-4 py-2 text-left">Chi tiết</th>
                  <th className="px-4 py-2 text-left">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {history.map((record, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-2 border-t">{formatTime(record.time)}</td>
                    <td className="px-4 py-2 border-t">{formatOperation(record.operation)}</td>
                    <td className="px-4 py-2 border-t">{formatDetails(record)}</td>
                    <td className="px-4 py-2 border-t">
                      <button
                        onClick={() => handleDeleteHistoryItem(index)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-gray-500">Chưa có lịch sử thao tác nào</div>
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

export default History; 