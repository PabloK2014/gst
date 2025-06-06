import axios from 'axios';

const API_URL = 'http://localhost:8000';

export interface Category {
    id?: number;
    name: string;
    description: string;
}

export const categoryService = {
    getAllCategories: async (): Promise<Category[]> => {
        const response = await axios.get(`${API_URL}/categories`);
        return response.data;
    },

    createCategory: async (category: Category): Promise<Category> => {
        const response = await axios.post(`${API_URL}/categories`, category);
        return response.data;
    },

    deleteCategory: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/categories/${id}`);
    }
};
