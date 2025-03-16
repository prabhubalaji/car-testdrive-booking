import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3002/api', // Base URL for your Node API
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getVehicleListAPI = async () => {
  try {
    const response = await api.get('/vehicles');
    return response.data;
  } catch (error) {
    console.error('API Error: ', error);
    throw error;
  }
}

export const checkSlotAvailabilityAPI = async ({vehicleType, location, startDateTime}) => {
  try {
    const response = await api.post('/check-availability', {
      vehicleType,
      location,
      startDateTime
    });
    return response.data;
  } catch (error) {
    console.error('API Error: ', error);
    throw error;
  }
}

export const bookSlotAPI = async ({ vehicleId, vehicleType, location, customerName, customerPhone, customerEmail, startDateTime}) => {
  try {
    return api.post('/book-test-drive', {
      vehicleId,
      vehicleType,
      location,
      customerName,
      customerPhone,
      customerEmail,
      startDateTime
    });
  } catch (error) {
    console.error('API Error: ', error);
    throw error;
  }
}