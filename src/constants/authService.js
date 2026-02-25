import { ENDPOINTS } from '../constants/config';

export const authService = {
    loginObserver: async (username, password, role) => {
        try {
            const response = await fetch(ENDPOINTS.OBSERVER_LOGIN, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, role }),
            });
            return await response.json();
        } catch (error) {
            console.error('Observer Login Error:', error);
            return { success: false, error: 'Network request failed' };
        }
    },

    loginVoter: async (phone, password) => {
        try {
            const response = await fetch(ENDPOINTS.VOTER_LOGIN, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, password }),
            });
            return await response.json();
        } catch (error) {
            console.error('Voter Login Error:', error);
            return { success: false, error: 'Network request failed' };
        }
    },

    registerVoter: async (userData) => {
        try {
            const response = await fetch(ENDPOINTS.VOTER_REGISTER, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            return await response.json();
        } catch (error) {
            console.error('Voter Registration Error:', error);
            return { success: false, error: 'Network request failed' };
        }
    }
};
