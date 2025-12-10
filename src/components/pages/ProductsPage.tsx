import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, ChevronDown } from 'lucide-react';
import { products, categories, brands } from '../../lib/data';
import { ProductCard } from '../ProductCard';

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sportType = searchParams.get('type');

  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [sortBy, setSortBy] = useState<string>('featured');

  // Get all products or filter by sport type
  const filteredByType = useMemo(() => {
    if (!sportType) return products.filter(p => p.active);
    
    const relevantCategories = categories
      .filter(c => c.sportType === sportType && c.active)
      .map(c => c.id);
    
    return products.filter(p => 
      p.active && relevantCategories.includes(p.categoryId)
    );
  }, [sportType]);

  // Apply filters
  const filteredProducts = useMemo(() => {
    let result = filteredByType;

    // Brand filter
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brandId));
    }

    // Price range filter
    result = result.filter(p => {
      const price = p.offlinePrice || p.mrp;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => (a.offlinePrice || a.mrp) - (b.offlinePrice || b.mrp));
        break;
      case 'price-high':
        result.sort((a, b) => (b.offlinePrice || b.mrp) - (a.offlinePrice || a.mrp));
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
    }

    return result;
  }, [filteredByType, selectedBrands, priceRange, sortBy]);

  const toggleBrand = (brandId: string) => {
    setSelectedBrands(prev =>
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setPriceRange([0, 50000]);
  };

  const activeBrands = brands.filter(b => b.active).sort((a, b) => a.order - b.order);

  const getSportTypeName = () => {
    switch (sportType) {
      case 'team': return 'Team Sports';
      case 'individual': return 'Individual Sports';
      case 'fitness': return 'Fitness & Training';
      case 'indoor': return 'Indoor Sports';
      case 'apparel': return 'Shoes & Clothing';
      default: return 'All Products';
    }
  };

  const activeFiltersCount = selectedBrands.length + (priceRange[0] > 0 || priceRange[1] < 50000 ? 1 : 0);

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4">{getSportTypeName()}</h1>
          <p className="text-xl text-blue-100">
            Browse our extensive collection of premium sports equipment
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg">Filters</h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Brand Filter */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="mb-3 text-sm">Brand</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {activeBrands.map((brand) => (
                    <label
                      key={brand.id}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand.id)}
                        onChange={() => toggleBrand(brand.id)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{brand.name}</span>
                      <span className="text-xs text-gray-400 ml-auto">
                        ({products.filter(p => p.brandId === brand.id && p.active).length})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="mb-3 text-sm">Price Range</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Min Price: ₹{priceRange[0].toLocaleString('en-IN')}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="500"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Max Price: ₹{priceRange[1].toLocaleString('en-IN')}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Min"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Price Filters */}
              <div>
                <h3 className="mb-3 text-sm">Quick Filters</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setPriceRange([0, 5000])}
                    className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Under ₹5,000
                  </button>
                  <button
                    onClick={() => setPriceRange([5000, 15000])}
                    className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    ₹5,000 - ₹15,000
                  </button>
                  <button
                    onClick={() => setPriceRange([15000, 25000])}
                    className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    ₹15,000 - ₹25,000
                  </button>
                  <button
                    onClick={() => setPriceRange([25000, 50000])}
                    className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Above ₹25,000
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <p className="text-gray-600">
                  Showing {filteredProducts.length} of {filteredByType.length} products
                  {activeFiltersCount > 0 && ` (${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''} applied)`}
                </p>
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex-1 sm:flex-none"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                {/* Sort Dropdown */}
                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden mb-6 p-4 bg-white border border-gray-200 rounded-lg space-y-6">
                <div className="flex items-center justify-between">
                  <h3>Filters</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Brand Filter */}
                <div>
                  <h4 className="mb-3 text-sm">Brand</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {activeBrands.map((brand) => (
                      <label
                        key={brand.id}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand.id)}
                          onChange={() => toggleBrand(brand.id)}
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{brand.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Mobile Price Filter */}
                <div>
                  <h4 className="mb-3 text-sm">Price Range</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => setPriceRange([0, 5000])}
                      className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg"
                    >
                      Under ₹5,000
                    </button>
                    <button
                      onClick={() => setPriceRange([5000, 15000])}
                      className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg"
                    >
                      ₹5,000 - ₹15,000
                    </button>
                    <button
                      onClick={() => setPriceRange([15000, 25000])}
                      className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg"
                    >
                      ₹15,000 - ₹25,000
                    </button>
                    <button
                      onClick={() => setPriceRange([25000, 50000])}
                      className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg"
                    >
                      Above ₹25,000
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={clearFilters}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Filter className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
