import React, { useState, useEffect } from 'react';

const TinhTable = () => {
    const [tinhData, setTinhData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTinhData = async () => {
            try {
                const response = await fetch('http://localhost:5000/tinh-data');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setTinhData(result.data);
            } catch (error) {
                console.error('Error fetching tinh data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTinhData();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2">Đang tải dữ liệu...</span>
        </div>
    );

    return (
        <div className="mt-4 bg-white rounded-lg shadow p-4 max-h-96 overflow-auto">
            <h3 className="text-lg font-semibold mb-2">Bảng Mã Tỉnh</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left">Mã Tỉnh</th>
                            <th className="px-4 py-2 text-left">Tên Tỉnh</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tinhData.map((tinh, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="px-4 py-2">{tinh.MaTinh}</td>
                                <td className="px-4 py-2">{tinh.TenTinh}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TinhTable; 