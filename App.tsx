
import React, { useState, useCallback } from 'react';
import { Product } from './types';
import { fetchProductData } from './services/geminiService';
import SearchForm from './components/SearchForm';
import ProductGrid from './components/ProductGrid';
import { SparklesIcon } from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setProducts([]);
    setHasSearched(true);
    setSearchTerm(query);

    try {
      const results = await fetchProductData(query);
      setProducts(results);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch product data. The AI might be busy, please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-8 md:mb-12">
          <div className="flex justify-center items-center gap-4 mb-4">
             <SparklesIcon className="w-10 h-10 text-sky-400" />
             <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-sky-400 to-cyan-300 text-transparent bg-clip-text">
                AI Product Aggregator
             </h1>
          </div>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Enter a product name to simulate scraping and comparing results from top e-commerce sites using AI.
          </p>
        </header>

        <main>
          <div className="max-w-2xl mx-auto mb-10">
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />
          </div>

          {error && (
            <div className="text-center text-red-400 bg-red-900/20 p-4 rounded-lg max-w-2xl mx-auto">
              <p>{error}</p>
            </div>
          )}

          <ProductGrid 
            products={products} 
            isLoading={isLoading}
            hasSearched={hasSearched}
            searchTerm={searchTerm}
          />
        </main>
        
        <footer className="text-center mt-12 text-slate-500 text-sm">
            <p>Powered by Gemini API. Product data is AI-generated for demonstration purposes.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
