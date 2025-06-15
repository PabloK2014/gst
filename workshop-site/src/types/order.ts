export interface Order {
  comment: string
  id: number
  product: {
    name: string
    description: string
    image: string
    price: number
  }
  status: string
  total_amount: number
  created_at: string
}