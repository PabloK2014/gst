import axios from 'axios';

const API_URL = 'http://185.178.47.86:8000/api';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  image?: string;
  custom_price_text?: string | null;
}

export interface ProductCreate {
  name: string;
  description: string;
  price: number;
  category_id: number;
  custom_price_text?: string | null;
}

export const productService = {
  async createProduct(product: ProductCreate, image?: File) {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('category_id', product.category_id.toString());
    if (product.custom_price_text !== undefined) {
      formData.append('custom_price_text', product.custom_price_text || '');
    }
    if (image) {
      formData.append('image', image);
    }

    console.log('Create Product FormData:', Object.fromEntries(formData)); // Отладка

    const response = await axios.post(`${API_URL}/products`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async getProducts() {
    const response = await axios.get(`${API_URL}/products`);
    console.log('Get Products Response:', response.data); // Отладка
    return response.data;
  },

  async updateProduct(id: number, product: ProductCreate, image?: File) {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('category_id', product.category_id.toString());
    if (product.custom_price_text !== undefined) {
      formData.append('custom_price_text', product.custom_price_text || '');
    }
    if (image) {
      formData.append('image', image);
    }

    console.log('Update Product FormData:', Object.fromEntries(formData)); // Отладка

    const response = await axios.put(`${API_URL}/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async deleteProduct(id: number) {
    const response = await axios.delete(`${API_URL}/products/${id}`);
    return response.data;
  },
};