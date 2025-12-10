import { useParams, useSearchParams } from 'react-router-dom';
import { products, brands, categories } from '../../lib/data';
import { ProductCard } from '../ProductCard';

export function BrandPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');

  const brand = brands.find((b) => b.slug === slug && b.active);
  let brandProducts = brand ? products.filter((p) => p.brandId === brand.id && p.active) : [];

  // Filter by category if specified
  if (categoryFilter) {
    brandProducts = brandProducts.filter(p => p.categoryId === categoryFilter);
  }

  // Group products by category
  const productsByCategory = brandProducts.reduce((acc, product) => {
    const categoryId = product.categoryId;
    if (!acc[categoryId]) {
      acc[categoryId] = [];
    }
    acc[categoryId].push(product);
    return acc;
  }, {} as Record<string, typeof brandProducts>);

  if (!brand) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="mb-4">Brand Not Found</h1>
        <p className="text-gray-600">The brand you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4">{brand.name}</h1>
          {brand.description && (
            <p className="text-xl text-gray-300 max-w-2xl">{brand.description}</p>
          )}
          <div className="mt-4 text-gray-400">
            {brandProducts.length} {brandProducts.length === 1 ? 'product' : 'products'} available
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {brandProducts.length > 0 ? (
          <div className="space-y-12">
            {Object.entries(productsByCategory).map(([categoryId, categoryProducts]) => {
              const category = categories.find(c => c.id === categoryId);
              if (!category) return null;

              return (
                <div key={categoryId}>
                  <h2 className="mb-6">{category.name}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categoryProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="mb-2">No products available</h3>
            <p className="text-gray-600">Check back soon for new {brand.name} products</p>
          </div>
        )}
      </div>
    </div>
  );
}
