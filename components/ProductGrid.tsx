
import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import SkeletonCard from './SkeletonCard';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  hasSearched: boolean;
  searchTerm: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading, hasSearched, searchTerm }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }
  
  if (hasSearched && products.length === 0 && !isLoading) {
    return (
        <div className="text-center py-16 px-6 bg-gray-800/50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-xl font-medium text-white">No products found</h3>
            <p className="mt-1 text-slate-400">We couldn't find any products for "{searchTerm}". Try another search.</p>
        </div>
    );
  }

  if (!hasSearched) {
    return (
      <div className="text-center py-16 text-slate-500">
        <p>Your product search results will appear here.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard key={`${product.title}-${index}`} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
