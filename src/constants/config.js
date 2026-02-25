// Replace with actual backend IP/URL when running on device
// Use the computer's LAN IP address for Expo Go mobile testing.
export const BASE_URL = 'http://10.163.32.233:5000';
export const API_URL = BASE_URL; // Alias used in LoginScreen.js

export const ENDPOINTS = {
    OBSERVER_LOGIN: `${BASE_URL}/api/observer/login`,
    VOTER_LOGIN: `${BASE_URL}/api/voter/login`,
    VOTER_REGISTER: `${BASE_URL}/api/voter/signup`,
};
