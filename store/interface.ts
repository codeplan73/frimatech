interface Product {
  id: string;
  productName?: string;
  name?: string;
  description: string;
  price: string | number;
  quantity?: string;
  availableQuantity?: Number;
  imageUrl?: string;
  images?: Array<{
    asset?: {_ref?: string; _type?: string};
    alt?: string;
  }>;
  category?: string;
  slug?: {current: string};
  createdAt?: Date | string;
  updated?: Date;
}
