import { useSearchParams } from 'react-router-dom';
import { products } from '../../lib/data';
import { ProductCard } from '../ProductCard';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const searchResults = products.filter((p) => {
    if (!p.active) return false;
    const searchTerm = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(searchTerm) ||
      p.brand.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.sku.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="mb-2">Search Results</h1>
        <p className="text-gray-600">
          {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found for &quot;{query}&quot;
        </p>
      </div>

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="mb-2">No results found</h2>
          <p className="text-gray-600 mb-6">
            We couldn&apos;t find any products matching &quot;{query}&quot;
          </p>
          <p className="text-sm text-gray-500">
            Try different keywords or browse our categories
          </p>
        </div>
      )}
    </div>
  );
}
