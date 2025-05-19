import axios from 'axios';
import { Product } from './productService';

export interface Category {
  id: number;
  name: string;
  description: string;
}

export const workshopService = {
  async getProductsByCategory(categoryName: string): Promise<Product[]> {
    try {
      const response = await axios.get(`http://localhost:8000/api/products`);
      const products = response.data;
      
      const categoryResponse = await axios.get(`http://localhost:8000/api/v1/categories`);
      const categories = categoryResponse.data;
      const category = categories.find((c: any) => 
        c.name.toLowerCase() === categoryName.toLowerCase()
      );
      
      if (!category) return [];
      
      return products.filter((product: Product) => 
        product.category_id === category.id
      );
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  },

  async getCategoryByName(categoryName: string): Promise<Category | null> {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/categories`);
      const categories = response.data;
      return categories.find((c: Category) => 
        c.name.toLowerCase() === categoryName.toLowerCase()
      ) || null;
    } catch (error) {
      console.error('Error fetching category:', error);
      return null;
    }
  }
};
