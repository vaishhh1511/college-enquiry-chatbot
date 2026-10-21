import axios from 'axios';

// In production the Express server serves this app, so the API lives on the same origin
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/**
 * Send user enquiry to AI Chatbot endpoint
 * @param {string} message - User query text
 * @returns {Promise<{ reply: string, category: string, suggestions?: string[] }>}
 */
export const sendChatMessage = async (message) => {
  const response = await apiClient.post('/chat', { message });
  return response.data;
};

/**
 * Fetch general college info
 */
export const getCollegeInfo = async () => {
  const response = await apiClient.get('/college');
  return response.data;
};

/**
 * Fetch all college courses
 */
export const getCourses = async () => {
  const response = await apiClient.get('/courses');
  return response.data;
};

/**
 * Fetch admission process & eligibility
 */
export const getAdmissions = async () => {
  const response = await apiClient.get('/admissions');
  return response.data;
};

/**
 * Fetch fee structure
 */
export const getFees = async () => {
  const response = await apiClient.get('/fees');
  return response.data;
};

/**
 * Fetch campus facilities
 */
export const getFacilities = async () => {
  const response = await apiClient.get('/facilities');
  return response.data;
};

/**
 * Fetch placement records & statistics
 */
export const getPlacements = async () => {
  const response = await apiClient.get('/placements');
  return response.data;
};

/**
 * Fetch frequently asked questions
 */
export const getFAQs = async () => {
  const response = await apiClient.get('/faqs');
  return response.data;
};

export default apiClient;
