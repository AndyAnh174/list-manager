const BASE_URL = 'http://localhost:5000';

export const studentApi = {
  createStudent: async (studentData) => {
    const response = await fetch(`${BASE_URL}/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  getStudent: async (sbd) => {
    const response = await fetch(`${BASE_URL}/students/${sbd}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  deleteStudent: async (sbd, year) => {
    const response = await fetch(`${BASE_URL}/students/${sbd}/${year}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  saveData: async () => {
    const response = await fetch(`${BASE_URL}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  getHistory: async () => {
    const response = await fetch(`${BASE_URL}/history`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  downloadUpdatedData: async () => {
    const response = await fetch(`${BASE_URL}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    
    if (data.download_url) {
      window.location.href = BASE_URL + data.download_url;
    }
    
    return data;
  },

  updateStudent: async (sbd, year, changes) => {
    try {
      const response = await fetch(`${BASE_URL}/students/${sbd}/${year}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(changes)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Lỗi khi cập nhật');
      }
      
      return response.json();
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật: ${error.message}`);
    }
  },

  clearHistory: async () => {
    const response = await fetch(`${BASE_URL}/history`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  clearHistoryItem: async (index) => {
    const response = await fetch(`${BASE_URL}/history/${index}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
}; 