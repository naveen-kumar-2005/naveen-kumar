
export interface Product {
  title: string;
  price: number;
  rating: number;
  source: 'Amazon' | 'Flipkart' | 'Best Buy' | string;
  imageUrl: string;
}
