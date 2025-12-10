import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { subcategories, categories, products, brands } from '../../lib/data';
import { ProductCard } from '../ProductCard';

export function SubcategoryPage() {
  const { slug } = useParams();

  const subcategory = subcategories.find((s) => s.slug === slug && s.active);
  const parentCategory = subcategory ? categories.find((c) => c.id === subcategory.parentId) : null;
  const subcategoryProducts = subcategory
    ? products.filter((p) => p.subcategoryId === subcategory.id && p.active)
    : [];

  // Group products by brand
  const productsByBrand = subcategoryProducts.reduce((acc, product) => {
    const brandId = product.brandId;
    if (!acc[brandId]) {
      acc[brandId] = [];
    }
    acc[brandId].push(product);
    return acc;
  }, {} as Record<string, typeof subcategoryProducts>);

  if (!subcategory) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="mb-4">Subcategory Not Found</h1>
        <p className="text-gray-600">The subcategory you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          {parentCategory && (
            <div className="flex items-center gap-2 text-sm text-blue-200 mb-4">
              <Link to={`/category/${parentCategory.slug}`} className="hover:text-white">
                {parentCategory.name}
              </Link>
              <span>/</span>
              <span className="text-white">{subcategory.name}</span>
            </div>
          )}
          <h1 className="mb-4">{subcategory.name}</h1>
          {subcategory.description && (
            <p className="text-xl text-blue-100 max-w-2xl">{subcategory.description}</p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                      to={`/brand/${brand.slug}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      View All {brand.name} Products →
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
            <p className="text-gray-600">Check back soon for new products in this subcategory</p>
          </div>
        )}
      </div>
    </div>
  );
}
