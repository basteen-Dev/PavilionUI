import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, ShoppingCart } from 'lucide-react';
import { categories, subcategories, products, brands } from '../../../lib/data';

export function B2BCreateOrder() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [orderItems, setOrderItems] = useState<Array<{ productId: string; quantity: number }>>([]);
  const [orderNotes, setOrderNotes] = useState('');

  const availableSubcategories = selectedCategory
    ? subcategories.filter(s => s.parentId === selectedCategory && s.active)
    : [];

  const availableProducts = products.filter(p => {
    if (!p.active) return false;
    if (selectedCategory && p.categoryId !== selectedCategory) return false;
    if (selectedSubcategory && p.subcategoryId !== selectedSubcategory) return false;
    if (selectedBrand && p.brandId !== selectedBrand) return false;
    return true;
  });

  const addToOrder = (productId: string) => {
    const existing = orderItems.find(item => item.productId === productId);
    if (existing) {
      setOrderItems(orderItems.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setOrderItems([...orderItems, { productId, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromOrder(productId);
    } else {
      setOrderItems(orderItems.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      ));
    }
  };

  const removeFromOrder = (productId: string) => {
    setOrderItems(orderItems.filter(item => item.productId !== productId));
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderItems.length === 0) {
      alert('Please add at least one product to your order');
      return;
    }
    alert(`Order created successfully! Total: ₹${calculateTotal().toLocaleString('en-IN')}\n\nWe will review your order and contact you shortly.`);
    navigate('/b2b/orders');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="mb-2">Create New Order</h1>
        <p className="text-gray-600">Select products and quantities for your B2B order</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Product Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="mb-4">Filter Products</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-1 text-gray-700">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedSubcategory('');
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.filter(c => c.active).map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700">Subcategory</label>
                <select
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  disabled={!selectedCategory}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                >
                  <option value="">All Subcategories</option>
                  {availableSubcategories.map((subcat) => (
                    <option key={subcat.id} value={subcat.id}>{subcat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700">Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Brands</option>
                  {brands.filter(b => b.active).map((brand) => (
                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Product List */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2>Available Products</h2>
              <p className="text-sm text-gray-600 mt-1">
                {availableProducts.length} products available
              </p>
            </div>
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {availableProducts.map((product) => (
                <div key={product.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm mb-1 truncate">{product.name}</h4>
                      <p className="text-xs text-gray-600">{product.brand} • {product.sku}</p>
                      <p className="text-sm text-blue-600 mt-1">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <button
                      onClick={() => addToOrder(product.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
            <h2 className="mb-4 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Order Summary
            </h2>

            {orderItems.length > 0 ? (
              <>
                <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto">
                  {orderItems.map((item) => {
                    const product = products.find(p => p.id === item.productId);
                    if (!product) return null;

                    return (
                      <div key={item.productId} className="flex gap-3 pb-3 border-b border-gray-100">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm truncate mb-1">{product.name}</h4>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center border border-gray-300 rounded">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                className="px-2 py-1 hover:bg-gray-100 text-sm"
                              >
                                -
                              </button>
                              <span className="px-2 py-1 text-sm border-x border-gray-300">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                className="px-2 py-1 hover:bg-gray-100 text-sm"
                              >
                                +
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFromOrder(item.productId)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            ₹{(product.price * item.quantity).toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-1 text-gray-700">Order Notes (Optional)</label>
                  <textarea
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                    placeholder="Any special instructions or comments..."
                  />
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">₹{calculateTotal().toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-900">Total</span>
                    <span className="text-xl text-blue-600">₹{calculateTotal().toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Order
                </button>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <ShoppingCart className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">No items added yet</p>
                <p className="text-xs mt-1">Add products from the list</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
