import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set Authorization header dynamically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

export const campaignService = {
  getCampaigns: async () => {
    const response = await api.get('/campaigns');
    return response.data;
  },
  getCampaignById: async (id) => {
    const response = await api.get(`/campaigns/${id}`);
    return response.data;
  },
  createCampaign: async (campaignData) => {
    const response = await api.post('/campaigns', campaignData);
    return response.data;
  },
  updateCampaign: async (id, campaignData) => {
    const response = await api.put(`/campaigns/${id}`, campaignData);
    return response.data;
  },
  deleteCampaign: async (id) => {
    const response = await api.delete(`/campaigns/${id}`);
    return response.data;
  },
};

export const donationService = {
  createDonation: async (donationData) => {
    const response = await api.post('/donations', donationData);
    return response.data;
  },
  getDonations: async () => {
    const response = await api.get('/donations');
    return response.data;
  },
  getStats: async () => {
    const response = await api.get('/donations/stats');
    return response.data;
  },
};

export const volunteerService = {
  registerVolunteer: async (volunteerData) => {
    const response = await api.post('/volunteers', volunteerData);
    return response.data;
  },
  getVolunteers: async () => {
    const response = await api.get('/volunteers');
    return response.data;
  },
  updateStatus: async (id, status) => {
    const response = await api.put(`/volunteers/${id}`, { status });
    return response.data;
  },
};

export default api;
