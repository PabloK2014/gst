import axios from 'axios';
import { Product } from './productService';

export interface Category {
  id: number;
  name: string;
  description: string;
}

const API_BASE_URL = 'http://185.178.47.86:8000/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const workshopService = {
  async getProductsByCategory(categoryName: string): Promise<Product[]> {
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        api.get('/api/products'),
        api.get('/api/v1/categories'),
      ]);
      let products = productsResponse.data;
      products = products.map((product: Product) => ({
        ...product,
        image: product.image?.replace('http://localhost:8000', '') || null,
      }));
      
      console.log('Продукты:', products);
      const categories = categoriesResponse.data;
      const category = categories.find((c: Category) => 
        c.name.toLowerCase() === categoryName.toLowerCase()
      );
      
      if (!category) return [];
      
      return products.filter((product: Product) => 
        product.category_id === category.id
      );
    } catch (error) {
      console.error('Ошибка загрузки продуктов:', error);
      return [];
    }
  },

  async getCategoryByName(categoryName: string): Promise<Category | null> {
    try {
      const response = await api.get('/api/v1/categories');
      const categories = response.data;
      return categories.find((c: Category) => 
        c.name.toLowerCase() === categoryName.toLowerCase()
      ) || null;
    } catch (error) {
      console.error('Ошибка загрузки категории:', error);
      return null;
    }
  },
};