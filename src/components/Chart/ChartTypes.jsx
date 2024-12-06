import React, { useEffect, useState } from 'react';
import { chartApi } from '../../api/chart';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line, Bar, Pie } from 'react-chartjs-2';
import tuongquan2018 from './tuongquan2018.png';
import tuongquan2019 from './tuongquan2019.png';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
  ChartDataLabels
);

const ChartContainer = ({ title, children, height = "400px" }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-semibold mb-6 text-center">{title}</h2>
    <div className="w-full" style={{ height: height }}>
      {children}
    </div>
  </div>
);

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    }
  }
};

export const BarChart = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching bar chart data...');
        const result = await chartApi.getBarChartData();
        console.log('Bar chart data received:', result);
        setData(result);
      } catch (err) {
        console.error('Error in BarChart:', err);
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!data) return <div className="text-gray-500">Đang tải dữ liệu...</div>;

  const options = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      datalabels: {
        display: true,
        color: '#000',
        font: {
          weight: 'bold'
        },
        formatter: (value) => value.toFixed(2)
      }
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => value.toFixed(2)
        }
      }
    }
  };

  console.log('Rendering bar chart with data:', data);
  return (
    <ChartContainer title="So sánh điểm trung bình các môn giữa năm 2018 và 2019">
      <Bar data={data} options={options} />
    </ChartContainer>
  );
};

export const LineChart = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await chartApi.getLineChartData();
        if (result && result.datasets) {
          const subjectMapping = {
            'Toan': 'Toán',
            'Van': 'Văn',
            'Ly': 'Lý',
            'Hoa': 'Hóa',
            'Sinh': 'Sinh',
            'Ngoai ngu': 'Ngoại ngữ',
            'Lich su': 'Lịch sử',
            'Dia ly': 'Địa lý',
            'GDCD': 'GDCD'
          };
          
          result.datasets = result.datasets.map(dataset => ({
            ...dataset,
            label: subjectMapping[dataset.label] || dataset.label
          }));
        }
        console.log('Line chart data:', result);
        setData(result);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching line chart data:', err);
      }
    };
    fetchData();
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!data) return <div className="text-gray-500">Đang tải dữ liệu...</div>;

  const options = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      datalabels: {
        display: true,
        color: '#000',
        font: {
          weight: 'bold',
          size: 11
        },
        formatter: (value) => value.toFixed(2),
        align: 'top'
      },
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold'
          },
          padding: 25
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => value.toFixed(2),
          font: {
            size: 12
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        ticks: {
          font: {
            size: 12
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    },
    elements: {
      line: {
        tension: 0.1,
        borderWidth: 3
      },
      point: {
        radius: 5,
        hoverRadius: 8,
        borderWidth: 2
      }
    }
  };

  return (
    <ChartContainer 
      title="Xu hướng điểm trung bình từng môn 2 năm 2018, 2019 TPHCM" 
      height="600px"
    >
      <Line data={data} options={options} />
    </ChartContainer>
  );
};

export const HistogramChart = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('Toan');
  const [selectedYear, setSelectedYear] = useState(2018);

  const subjects = [
    { value: 'Toan', label: 'Toán' },
    { value: 'Van', label: 'Văn' },
    { value: 'Ly', label: 'Lý' },
    { value: 'Hoa', label: 'Hóa' },
    { value: 'Sinh', label: 'Sinh' },
    { value: 'Ngoai ngu', label: 'Ngoại ngữ' },
    { value: 'Lich su', label: 'Lịch sử' },
    { value: 'Dia ly', label: 'Địa lý' },
    { value: 'GDCD', label: 'GDCD' }
  ];

  const years = [2018, 2019];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await chartApi.getHistogramData(selectedSubject, selectedYear);
        console.log('Histogram data:', result);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching histogram data:', err);
      }
    };
    fetchData();
  }, [selectedSubject, selectedYear]);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!data) return <div className="text-gray-500">Đang tải dữ liệu...</div>;

  const options = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      datalabels: {
        display: true,
        color: '#000',
        font: {
          weight: 'bold',
          size: 12
        },
        formatter: (value) => value
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Số lượng học sinh',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Khoảng điểm',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      }
    }
  };

  return (
    <ChartContainer title="Phân phối điểm số" height="500px">
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chọn môn học
          </label>
          <select
            className="w-full p-2 border rounded-lg bg-white shadow-sm"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            {subjects.map(subject => (
              <option key={subject.value} value={subject.value}>
                {subject.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chọn năm
          </label>
          <select
            className="w-full p-2 border rounded-lg bg-white shadow-sm"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Bar data={data} options={options} />
    </ChartContainer>
  );
};

export const PieChart = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await chartApi.getPieChartData();
        console.log('Pie chart data:', result);
        if (result && result.datasets) {
          result.datasets = result.datasets.map(dataset => ({
            ...dataset,
            backgroundColor: ['rgba(54, 162, 235, 0.8)', 'rgba(255, 99, 132, 0.8)']
          }));
        }
        setData(result);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching pie chart data:', err);
      }
    };
    fetchData();
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!data) return <div className="text-gray-500">Đang tải dữ liệu...</div>;

  const options = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold'
          },
          padding: 20
        }
      },
      datalabels: {
        display: true,
        color: '#fff',
        font: {
          weight: 'bold',
          size: 14
        },
        formatter: (value, ctx) => {
          const sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = ((value * 100) / sum).toFixed(1) + '%';
          return `${value}\n(${percentage})`;
        }
      }
    }
  };

  return (
    <ChartContainer 
      title="Tỉ lệ đậu/rớt của học sinh" 
      height="500px"
    >
      <Pie data={data} options={options} />
    </ChartContainer>
  );
};

export const AreaChart = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await chartApi.getAreaChartData();
        console.log('Area chart data:', result);
        setData(result);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching area chart data:', err);
      }
    };
    fetchData();
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!data) return <div className="text-gray-500">Đang tải dữ liệu...</div>;

  const areaOptions = {
    ...commonOptions,
    fill: true
  };

  return (
    <ChartContainer title="Phân phối điểm theo khối">
      <Line data={data} options={areaOptions} />
    </ChartContainer>
  );
};

export const HeatmapChart = ({ year }) => {
  return (
    <ChartContainer 
      title={`Ma Trận Tương Quan Giữa Các Môn Học Năm ${year} TPHCM`}
      height="auto"
    >
      <div className="flex justify-center items-center">
        <img 
          src={year === 2018 ? tuongquan2018 : tuongquan2019}
          alt={`Ma trận tương quan năm ${year}`}
          style={{ 
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            aspectRatio: '1/1'
          }}
        />
      </div>
    </ChartContainer>
  );
};
  