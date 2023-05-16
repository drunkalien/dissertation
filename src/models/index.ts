export type User = {
  id: number;
  username: string;
  role: Roles;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
};

export type Product = {
  ID: number;
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  orders: Order[]; // TODO add proper type
  created_at: number;
  updated_ad: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
};

export type Order = {
  id: number;
  product_id: number;
  quantity: number;
  total_price: number;
  created_at: number;
  updated_ad: number;
  product: Product;
};

export enum Roles {
  ADMIN,
  USER,
}
