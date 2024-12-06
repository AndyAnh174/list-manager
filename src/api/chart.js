const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const chartApi = {
  getBarChartData: async () => {
    try {
      console.log('Calling bar chart API...');
      const response = await fetch(`${BASE_URL}/chart/bar`);
      console.log('Bar chart API response:', response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Network response was not ok');
      }
      const data = await response.json();
      console.log('Bar chart data received:', data);
      return data;
    } catch (error) {
      console.error('Error in getBarChartData:', error);
      throw error;
    }
  },

  getLineChartData: async () => {
    const response = await fetch(`${BASE_URL}/chart/line`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  getHistogramData: async (subject, year) => {
    const response = await fetch(`${BASE_URL}/chart/histogram/${subject}/${year}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  getPieChartData: async () => {
    const response = await fetch(`${BASE_URL}/chart/pie`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  getAreaChartData: async () => {
    const response = await fetch(`${BASE_URL}/chart/area`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  getHeatmapData: async (year) => {
    const response = await fetch(`${BASE_URL}/chart/heatmap/${year}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
}; 