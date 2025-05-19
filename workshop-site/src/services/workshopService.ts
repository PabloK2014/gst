import axios from 'axios';
import { Product } from './productService';



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
  }
};
