export interface Product {
  id: number,
  name: string,
  price?: number,
  user_id: number,
  category_id: number,
  created_at: Date,
  updated_at: Date
}
