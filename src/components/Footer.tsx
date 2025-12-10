import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { categories, storeInfo } from '../lib/data';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white">PS</span>
              </div>
              <div>
                <div className="text-white tracking-tight">Pavilion Sports</div>
                <div className="text-xs">Since 1988</div>
              </div>
            </div>
            <p className="mb-4">
              India&apos;s most trusted multi-sport retailer offering authentic equipment with expert guidance and unmatched customer service.
            </p>
            <div className="flex gap-3">
              {storeInfo.socialMedia.facebook && (
                <a href={storeInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {storeInfo.socialMedia.twitter && (
                <a href={storeInfo.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {storeInfo.socialMedia.instagram && (
                <a href={storeInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {storeInfo.socialMedia.youtube && (
                <a href={storeInfo.socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/category/cricket" className="hover:text-white transition-colors">Browse Products</Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-white transition-colors">Careers</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/b2b/login" className="hover:text-white transition-colors">B2B Portal</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white mb-4">Popular Categories</h3>
            <ul className="space-y-2">
              {categories.filter(c => c.active && !c.parentId).slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link to={`/category/${category.slug}`} className="hover:text-white transition-colors">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>
                  {storeInfo.address}<br />
                  {storeInfo.city}, {storeInfo.state} {storeInfo.pincode}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>{storeInfo.phone[0]}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>{storeInfo.email}</span>
              </li>
              <li className="text-sm">
                <strong className="text-white">Store Hours:</strong><br />
                <span className="text-sm">
                  Mon-Fri: {storeInfo.workingHours.weekdays}<br />
                  Sat: {storeInfo.workingHours.saturday}<br />
                  Sun: {storeInfo.workingHours.sunday}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              © 1988-2024 Pavilion Sports. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
            </div>
          </div>
          <p className="text-sm text-center mt-4 text-gray-500">
            Note: Online and offline prices may vary. Please visit our store or contact us for latest pricing and availability.
          </p>
        </div>
      </div>
    </footer>
  );
}