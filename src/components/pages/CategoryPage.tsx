import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { categories, subcategories, products, brands, getProductsByCategory } from '../../lib/data';
import { ProductCard } from '../ProductCard';
import { useState } from 'react';

export function CategoryPage() {
  const { slug } = useParams();
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const category = categories.find((c) => c.slug === slug && c.active);
  const categorySubcategories = subcategories.filter((s) => s.parentId === category?.id && s.active);
  
  let categoryProducts = category ? getProductsByCategory(category.id) : [];
  
  // Filter by brand if selected
  if (selectedBrand) {
    categoryProducts = categoryProducts.filter(p => p.brandId === selectedBrand);
  }

  // Group products by brand
  const productsByBrand = categoryProducts.reduce((acc, product) => {
    const brandId = product.brandId;
    if (!acc[brandId]) {
      acc[brandId] = [];
    }
    acc[brandId].push(product);
    return acc;
  }, {} as Record<string, typeof categoryProducts>);

  const availableBrands = brands.filter(b => 
    categoryProducts.some(p => p.brandId === b.id) && b.active
  );

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="mb-4">Category Not Found</h1>
        <p className="text-gray-600">The category you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4">{category.name}</h1>
          {category.description && (
            <p className="text-xl text-blue-100 max-w-2xl">{category.description}</p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Subcategories Grid */}
        {categorySubcategories.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-6">Browse by Type</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categorySubcategories.map((subcat) => (
                <Link
                  key={subcat.id}
                  to={`/subcategory/${subcat.slug}`}
                  className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:border-blue-300 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <span className="text-xl">📦</span>
                  </div>
                  <div className="text-sm group-hover:text-blue-600 transition-colors">{subcat.name}</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Brand Filter */}
        {availableBrands.length > 0 && (
          <div className="mb-8">
            <h3 className="mb-4">Filter by Brand</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedBrand(null)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  !selectedBrand
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-300'
                }`}
              >
                All Brands
              </button>
              {availableBrands.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => setSelectedBrand(brand.id)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedBrand === brand.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-300'
                  }`}
                >
                  {brand.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Products by Brand */}
        {Object.keys(productsByBrand).length > 0 ? (
          <div className="space-y-12">
            {Object.entries(productsByBrand).map(([brandId, brandProducts]) => {
              const brand = brands.find(b => b.id === brandId);
              if (!brand) return null;

              return (
                <div key={brandId}>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="mb-1">{brand.name}</h2>
                      {brand.description && (
                        <p className="text-gray-600">{brand.description}</p>
                      )}
                    </div>
                    <Link
                      to={`/brand/${brand.slug}?category=${category.id}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      View All →
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {brandProducts.map((product) => (
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
            <p className="text-gray-600">Check back soon for new products in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
