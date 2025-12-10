import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Eye, Mail, ShoppingBag, Share2, QrCode, X } from 'lucide-react';
import { products, brands, categories } from '../../lib/data';

export function ProductDetailPage() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug && p.active);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showQR, setShowQR] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Link to="/" className="text-blue-600 hover:text-blue-700">
          Return to Home
        </Link>
      </div>
    );
  }

  const brand = brands.find((b) => b.id === product.brandId);
  const category = categories.find((c) => c.id === product.categoryId);
  const productUrl = `${window.location.origin}/product/${product.slug}`;

  const getActionButton = () => {
    switch (product.actionType) {
      case 'view':
        return (
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors">
            <Eye className="w-5 h-5" />
            Product Details
          </button>
        );
      case 'enquire':
        return (
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Mail className="w-5 h-5" />
            Send Enquiry
          </button>
        );
      case 'shopnow':
        return (
          <a
            href={`mailto:info@pavilionsports.com?subject=Order Request - ${product.name}&body=I would like to purchase ${product.name} (SKU: ${product.sku})`}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            Shop Now
          </a>
        );
    }
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          {category && (
            <>
              <Link to={`/category/${category.slug}`} className="hover:text-blue-600">
                {category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Product Media */}
          <div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4 relative">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                      selectedImage === idx ? 'border-blue-600' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Brand */}
            {brand && (
              <Link to={`/brand/${brand.slug}`} className="text-blue-600 hover:text-blue-700 mb-2 inline-block">
                {brand.name}
              </Link>
            )}

            {/* Product Title */}
            <h1 className="mb-4">{product.name}</h1>

            {/* SKU */}
            <p className="text-sm text-gray-600 mb-4">SKU: {product.sku}</p>

            {/* Price */}
            <div className="border-t border-b border-gray-200 py-4 mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl text-blue-600">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.mrp > product.price && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      ₹{product.mrp.toLocaleString('en-IN')}
                    </span>
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">
                      {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-500">Inclusive of all taxes</p>
            </div>

            {/* Product Description */}
            <div className="mb-6">
              <h3 className="mb-2">Product Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Availability */}
            <div className="mb-6 flex gap-2">
              {product.availableOnline && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Available Online
                </span>
              )}
              {product.availableOffline && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Available in Store
                </span>
              )}
              {!product.inStock && (
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3 mb-6">
              {product.inStock && getActionButton()}
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowQR(!showQR)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <QrCode className="w-5 h-5" />
                  QR Code
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>

            {/* Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
              <strong>Note:</strong> Prices may vary between online and offline channels. Contact us for latest pricing and bulk orders.
            </div>
          </div>
        </div>

        {/* A+ Content / Extra Information */}
        {product.aplusContent && product.aplusContent.length > 0 && (
          <div className="mb-16">
            <h2 className="mb-6">Product Information</h2>
            <div className="space-y-8">
              {product.aplusContent.map((content, idx) => (
                <div key={idx} className="bg-white rounded-lg border border-gray-200 p-6">
                  {content.title && <h3 className="mb-4">{content.title}</h3>}
                  
                  {content.type === 'text' && (
                    <p className="text-gray-700">{content.content}</p>
                  )}
                  
                  {content.type === 'table' && (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            {content.content.headers.map((header: string, i: number) => (
                              <th key={i} className="text-left py-2 px-4 text-gray-900">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {content.content.rows.map((row: string[], i: number) => (
                            <tr key={i} className="border-b border-gray-100">
                              {row.map((cell, j) => (
                                <td key={j} className="py-2 px-4 text-gray-700">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowQR(false)}
        >
          <div className="bg-white rounded-lg p-8 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3>Product QR Code</h3>
              <button
                onClick={() => setShowQR(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-white p-4 rounded border border-gray-200">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(productUrl)}`}
                alt={`QR Code for ${product.name}`}
                className="w-full"
              />
            </div>
            <p className="text-sm text-gray-600 text-center mt-4">
              Scan to view this product on your mobile device
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
