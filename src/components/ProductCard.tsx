import { Link } from 'react-router-dom';
import { Phone, Mail, QrCode, MapPin } from 'lucide-react';
import { Product } from '../lib/data';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [showQR, setShowQR] = useState(false);
  const productUrl = `${window.location.origin}/product/${product.slug}`;
  
  const discount = product.mrp && product.offlinePrice 
    ? Math.round(((product.mrp - product.offlinePrice) / product.mrp) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      <Link to={`/product/${product.slug}`} className="block relative">
        <div className="aspect-square overflow-hidden bg-gray-100 relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="bg-red-500 text-white px-4 py-2 rounded-lg">Out of Stock</span>
            </div>
          )}
          {product.newArrival && product.inStock && (
            <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs shadow-lg">
              New Arrival
            </div>
          )}
          {discount > 0 && product.inStock && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs shadow-lg">
              {discount}% OFF
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="text-xs text-blue-600 mb-1 uppercase tracking-wide">{product.brand}</div>
        <Link to={`/product/${product.slug}`}>
          <h3 className="mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors text-sm">
            {product.name}
          </h3>
        </Link>

        <div className="mb-3">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-lg text-gray-900">₹{(product.offlinePrice || product.mrp).toLocaleString('en-IN')}</span>
            {product.offlinePrice && product.mrp > product.offlinePrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500">Store Price | SKU: {product.sku}</p>
        </div>

        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`tel:+918023456789`}
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call</span>
            </a>
            <a
              href={`https://wa.me/918023456789?text=Hi, I'm interested in ${product.name} (SKU: ${product.sku})`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/contact"
              className="flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-xs"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Enquire</span>
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowQR(!showQR);
              }}
              className="flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-xs"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>QR</span>
            </button>
          </div>
        </div>

        {showQR && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg text-center border border-gray-200">
            <div className="w-32 h-32 mx-auto bg-white p-2 rounded-lg shadow-sm">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(productUrl)}`}
                alt={`QR Code for ${product.name}`}
                className="w-full h-full"
              />
            </div>
            <p className="text-xs text-gray-600 mt-2">Scan to view details</p>
          </div>
        )}

        {product.availableInStore && (
          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-green-700 bg-green-50 py-2 rounded-lg">
            <MapPin className="w-3.5 h-3.5" />
            <span>Available in Store</span>
          </div>
        )}
      </div>
    </div>
  );
}
