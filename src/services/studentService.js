import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const studentService = {
  createStudent: async (studentData) => {
    return await axios.post(`${API_URL}/students`, studentData);
  },

  getStudent: async (sbd) => {
    return await axios.get(`${API_URL}/students/${sbd}`);
  },

  updateStudent: async (sbd, studentData) => {
    return await axios.put(`${API_URL}/students/${sbd}`, studentData);
  },

  deleteStudent: async (sbd, year) => {
    return await axios.delete(`${API_URL}/students/${sbd}/${year}`);
  }
}; 