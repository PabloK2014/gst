import axios from 'axios';

const API_URL = 'http://localhost:8000';

export interface User {
    id: number;
    email: string;
    phone: string;
    role: string;
    username: string;
}

export interface UserFilter {
    search?: string;
    page: number;
    per_page: number;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
}

export const userService = {
    getUsers: async (filter: UserFilter): Promise<PaginatedResponse<User>> => {
        const response = await axios.get(`${API_URL}/users/users`, {
            params: filter
        });
        return response.data;
    },

    updateUserRole: async (userId: number, role: string): Promise<User> => {
        const token = localStorage.getItem('access_token');
        const response = await axios.patch(
            `${API_URL}/users/users/${userId}/role`, 
            { role },  
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                }
            }
        );
        return response.data;
    },

    getCurrentUser: async () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            throw new Error('No access token found');
        }
        const response = await axios.get(`${API_URL}/users/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }
};
