import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { categories, subcategories, brands } from '../lib/data';

export function MegaMenu() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryHover = (categoryId: string) => {
    setActiveCategory(categoryId);
    setIsOpen(true);
  };

  const activeCategoryData = categories.find(c => c.id === activeCategory);
  const activeCategorySubcategories = subcategories.filter(s => s.parentId === activeCategory && s.active);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
      >
        Products
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-0 bg-white border border-gray-200 rounded-b-lg shadow-xl z-50 w-screen max-w-6xl">
          <div className="grid grid-cols-12 min-h-[400px]">
            {/* Categories Sidebar */}
            <div className="col-span-3 bg-gray-50 border-r border-gray-200 p-4">
              <h3 className="px-3 py-2 text-sm text-gray-500 uppercase tracking-wide">
                Categories
              </h3>
              <nav className="space-y-1 mt-2">
                {categories.filter(c => c.active).map((category) => (
                  <button
                    key={category.id}
                    onMouseEnter={() => handleCategoryHover(category.id)}
                    onClick={() => {
                      setIsOpen(false);
                      setActiveCategory(null);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Link
                      to={`/category/${category.slug}`}
                      className="block w-full"
                    >
                      {category.name}
                    </Link>
                  </button>
                ))}
              </nav>
            </div>

            {/* Subcategories & Brands */}
            <div className="col-span-9 p-6">
              {activeCategoryData ? (
                <div>
                  <div className="mb-6">
                    <h3 className="mb-2">{activeCategoryData.name}</h3>
                    {activeCategoryData.description && (
                      <p className="text-sm text-gray-600">{activeCategoryData.description}</p>
                    )}
                  </div>

                  {activeCategorySubcategories.length > 0 ? (
                    <>
                      <h4 className="text-sm text-gray-500 uppercase tracking-wide mb-4">
                        Browse by Type
                      </h4>
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {activeCategorySubcategories.map((subcat) => (
                          <Link
                            key={subcat.id}
                            to={`/subcategory/${subcat.slug}`}
                            onClick={() => {
                              setIsOpen(false);
                              setActiveCategory(null);
                            }}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                          >
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                              <span className="text-lg">📦</span>
                            </div>
                            <span className="text-sm group-hover:text-blue-600 transition-colors">
                              {subcat.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : null}

                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-sm text-gray-500 uppercase tracking-wide mb-4">
                      Popular Brands
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {brands.filter(b => b.active).slice(0, 8).map((brand) => (
                        <Link
                          key={brand.id}
                          to={`/brand/${brand.slug}?category=${activeCategoryData.id}`}
                          onClick={() => {
                            setIsOpen(false);
                            setActiveCategory(null);
                          }}
                          className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:border-blue-300 hover:text-blue-600 transition-colors"
                        >
                          {brand.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>Hover over a category to see subcategories and brands</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
