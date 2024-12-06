import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  LineChart,
  HistogramChart,
  PieChart,
  AreaChart,
  HeatmapChart
} from './ChartTypes';
import { FaChartBar, FaChartLine, FaChartArea, FaChartPie, FaHome } from 'react-icons/fa';
import { TbChartHistogram } from 'react-icons/tb';
import { BsGrid1X2Fill } from 'react-icons/bs';

const ChartMain = ({ navigateToHome }) => {
  const [selectedChart, setSelectedChart] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const [error, setError] = useState(null);

  const charts = [
    { id: 'bar', name: 'Biểu Đồ Cột', icon: FaChartBar, component: BarChart, description: 'So sánh điểm trung bình các môn giữa năm 2018 và 2019' },
    { id: 'line', name: 'Biểu Đồ Đường', icon: FaChartLine, component: LineChart, description: 'Thể hiện sự thay đổi điểm trung bình theo thời gian' },
    { id: 'histogram', name: 'Biểu Đồ Phân Phối', icon: TbChartHistogram, component: HistogramChart, description: 'Phân phối điểm số các môn năm 2018 và 2019' },
    { id: 'pie', name: 'Biểu Đồ Tròn', icon: FaChartPie, component: PieChart, description: 'Tỉ lệ đậu/rớt của học sinh qua các năm' },
    { id: 'area', name: 'Biểu Đồ Vùng', icon: FaChartArea, component: AreaChart, description: 'Phân phối điểm theo từng khối học' },
    { id: 'heatmap2018', name: 'Ma Trận Tương Quan 2018', icon: BsGrid1X2Fill, component: () => <HeatmapChart year={2018} />, description: 'Mối tương quan giữa các môn học năm 2018' },
    { id: 'heatmap2019', name: 'Ma Trận Tương Quan 2019', icon: BsGrid1X2Fill, component: () => <HeatmapChart year={2019} />, description: 'Mối tương quan giữa các môn học năm 2019' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Lỗi!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Biểu Đồ Thống Kê
          </h1>
          <button
            onClick={navigateToHome}
            className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm md:text-base"
          >
            <FaHome className="text-xl" /> Về trang chủ
          </button>
        </div>

        {!selectedChart ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {charts.map((chart) => (
              <motion.div
                key={chart.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
                onClick={() => setSelectedChart(chart)}
              >
                <div className="p-6 flex flex-col items-center gap-4 hover:bg-gray-50 transition-colors">
                  <chart.icon className="text-4xl text-blue-500" />
                  <h3 className="text-xl font-semibold text-gray-700 text-center">
                    {chart.name}
                  </h3>
                  <p className="text-gray-500 text-center text-sm">
                    {chart.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    {selectedChart.name}
                  </h2>
                  <p className="text-gray-600">{selectedChart.description}</p>
                </div>
                {!showChart && (
                  <button
                    onClick={() => setShowChart(true)}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Vẽ biểu đồ
                  </button>
                )}
              </div>
              {showChart && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ErrorBoundary onError={(error) => setError(error.message)}>
                    <selectedChart.component />
                  </ErrorBoundary>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Component ErrorBoundary để bắt lỗi
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) {
      return <div className="text-red-500">Có lỗi xảy ra khi tải biểu đồ</div>;
    }
    return this.props.children;
  }
}

export default ChartMain; 