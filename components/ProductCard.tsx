import React from 'react';
import { Product } from '../types';
import StarIcon from './icons/StarIcon';
import AmazonIcon from './icons/AmazonIcon';
import FlipkartIcon from './icons/FlipkartIcon';
import BestBuyIcon from './icons/BestBuyIcon';

interface ProductCardProps {
  product: Product;
}

const SourceIcon: React.FC<{ source: string }> = ({ source }) => {
    switch (source.toLowerCase()) {
        case 'amazon':
            return <AmazonIcon className="w-16 h-auto" />;
        case 'flipkart':
            return <FlipkartIcon className="w-16 h-auto" />;
        case 'best buy':
            return <BestBuyIcon className="w-16 h-auto" />;
        default:
            return <span className="text-sm font-semibold">{source}</span>;
    }
};

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={`full-${i}`} className="w-5 h-5 text-amber-400" fill="currentColor" />
      ))}
      {halfStar && <StarIcon key="half" className="w-5 h-5 text-amber-400" fill="currentColor" style={{ clipPath: 'inset(0 50% 0 0)' }} />}
      {[...Array(emptyStars)].map((_, i) => (
        <StarIcon key={`empty-${i}`} className="w-5 h-5 text-gray-600" fill="currentColor" />
      ))}
    </div>
  );
};


const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-500/20 border border-gray-700 hover:border-cyan-600 transition-all duration-300 flex flex-col group">
      <div className="relative overflow-hidden">
        <img 
            src={product.imageUrl} 
            alt={product.title} 
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute top-0 right-0 m-2 bg-gray-900/70 p-2 rounded-md backdrop-blur-sm">
             <SourceIcon source={product.source} />
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-white mb-2 flex-grow min-h-[56px] line-clamp-2">
            {product.title}
        </h3>
        
        <div className="flex items-center justify-between mt-2 mb-4">
          <div className="flex items-center gap-1">
            <RatingStars rating={product.rating} />
            <span className="text-sm text-slate-400 ml-1">({product.rating.toFixed(1)})</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-700/50">
            <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-cyan-400">
                    ₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="bg-slate-700 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-sky-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-sky-500"
                >
                    View Deal
                </a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;