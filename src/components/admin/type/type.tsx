export type Product = {
  id: number;
  name: string;
  productId: string;
  price: number;
  stock: string;
  type: string;
  status: string;
  image: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  roles: string[];
  status: "Active" | "Inactive" | "Pending" | "Banned";
  createdAt: string;
};

export type Role = {
  id: string;
  name: string;
 description: string;
 isDefault: boolean;
};
