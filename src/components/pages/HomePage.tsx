import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Shield, Star, MapPin, Phone, ChevronRight, Award } from 'lucide-react';
import { categories, products, testimonials, banners, brands, storeInfo } from '../../lib/data';
import { ProductCard } from '../ProductCard';
import { TestimonialCard } from '../TestimonialCard';

export function HomePage() {
  const featuredProducts = products.filter((p) => p.featured && p.active).slice(0, 8);
  const newArrivals = products.filter((p) => p.newArrival && p.active).slice(0, 4);
  const featuredTestimonials = testimonials.filter(t => t.featured && t.active).slice(0, 3);
  const activeCategories = categories.filter(c => c.active && !c.parentId).sort((a, b) => a.order - b.order);
  const featuredBrands = brands.filter(b => b.featured && b.active).sort((a, b) => a.order - b.order);
  const activeBanners = banners.filter(b => b.active).sort((a, b) => a.order - b.order);

  return (
    <div>
      {/* Hero Section with Banner */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700/50 backdrop-blur-sm rounded-full text-sm mb-6">
                <Trophy className="w-4 h-4" />
                <span>Serving Since 1988 | 36+ Years of Excellence</span>
              </div>
              <h1 className="mb-6 text-4xl lg:text-5xl xl:text-6xl text-white">
                India&apos;s Most Trusted Sports Equipment Store
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Authentic sports equipment from world&apos;s leading brands. Expert guidance, premium quality, and unmatched customer service.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/category/cricket"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-blue-900 rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
                >
                  Explore Cricket Equipment
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href={`tel:${storeInfo.phone[0].replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-900 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800"
                alt="Sports Equipment"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-6 rounded-xl shadow-2xl max-w-[220px]">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="w-8 h-8 text-blue-600" />
                  <div className="text-4xl text-blue-600">36+</div>
                </div>
                <div className="text-sm text-gray-600">Years of Trust & Expertise in Sports Retail</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-6 rounded-lg bg-blue-50 border border-blue-100">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="mb-2">100% Authentic</h3>
                <p className="text-gray-600 text-sm">
                  All products sourced directly from authorized brands and manufacturers
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-lg bg-blue-50 border border-blue-100">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="mb-2">Expert Guidance</h3>
                <p className="text-gray-600 text-sm">
                  Professional advice from experienced sports enthusiasts and former players
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-lg bg-blue-50 border border-blue-100">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="mb-2">Largest Collection</h3>
                <p className="text-gray-600 text-sm">
                  Widest range of sports equipment across all major sports categories
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      {featuredBrands.length > 0 && (
        <section className="py-12 bg-gray-50 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="mb-3">Our Authorized Brands</h2>
              <p className="text-gray-600">We stock premium equipment from world&apos;s leading sports brands</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
              {featuredBrands.map((brand) => (
                <Link
                  key={brand.id}
                  to={`/brand/${brand.slug}`}
                  className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-center hover:shadow-lg hover:border-blue-300 transition-all group"
                >
                  <span className="text-gray-700 group-hover:text-blue-600 transition-colors text-center">
                    {brand.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Shop by Sport</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our comprehensive range of sports equipment and accessories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {activeCategories.slice(0, 10).map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="bg-white rounded-xl border-2 border-gray-200 p-6 text-center hover:shadow-xl hover:border-blue-500 transition-all group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-3xl">🏏</span>
                </div>
                <h3 className="text-sm mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-xs text-gray-500 line-clamp-2">{category.description}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Heritage Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm mb-4">
              Nearly 3 Decades of Excellence
            </div>
            <h2 className="mb-6">Quality Sports Product Dealer</h2>
            <div className="max-w-4xl mx-auto text-gray-700 leading-relaxed space-y-4">
              <p className="text-lg">
                Serving customers for nearly 3 decades, The Pavilion sports shop has consistently been entrenched as a Quality Sports Product Dealer. From visitors to our store like <strong>Mahendra Singh Dhoni, Sunil Gavaskar, Ricky Ponting</strong> to <strong>Richard Hadlee</strong>, we have been patronised by sports legends nationally and internationally.
              </p>
              <p className="text-lg">
                Not only we sell the <strong className="text-blue-600">highest number of cricket bats in India</strong>, we are the cricket specialist! Our store is also known for wide range of products for TT, Badminton, Fitness & Training accessories, Indoor games, Shoes and clothing.
              </p>
            </div>
          </div>

          {/* Sport Type Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mt-12">
            <Link
              to="/products?type=team"
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="aspect-[4/5] relative">
                <img
                  src="https://images.unsplash.com/photo-1730739628981-6537b299aea3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlja2V0JTIwdGVhbSUyMHNwb3J0c3xlbnwxfHx8fDE3NjUzNjkyMTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Team Sports"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-white mb-2">Team Sports</h3>
                  <p className="text-sm text-gray-200 mb-3">Cricket, Football, Hockey, Basketball</p>
                  <div className="flex items-center gap-2 text-sm text-blue-300">
                    Browse Collection
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            <Link
              to="/products?type=individual"
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="aspect-[4/5] relative">
                <img
                  src="https://images.unsplash.com/photo-1722087642932-9b070e9a066e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBwbGF5ZXJ8ZW58MXx8fHwxNzY1MjcwNDk2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Individual Sports"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-white mb-2">Individual Sports</h3>
                  <p className="text-sm text-gray-200 mb-3">Badminton, Tennis, Table Tennis</p>
                  <div className="flex items-center gap-2 text-sm text-blue-300">
                    Browse Collection
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            <Link
              to="/products?type=fitness"
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="aspect-[4/5] relative">
                <img
                  src="https://images.unsplash.com/photo-1620188540300-c156a625c6fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjBmaXRuZXNzJTIwdHJhaW5pbmd8ZW58MXx8fHwxNzY1Mjk0MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Fitness & Training"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-white mb-2">Fitness/Training</h3>
                  <p className="text-sm text-gray-200 mb-3">Gym Equipment, Training Accessories</p>
                  <div className="flex items-center gap-2 text-sm text-blue-300">
                    Browse Collection
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            <Link
              to="/products?type=indoor"
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="aspect-[4/5] relative">
                <img
                  src="https://images.unsplash.com/photo-1716703435691-1e5205044c8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZSUyMHRlbm5pcyUyMGluZG9vcnxlbnwxfHx8fDE3NjUyNzg0MDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Indoor Sports"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-white mb-2">Indoor</h3>
                  <p className="text-sm text-gray-200 mb-3">Indoor Games & Equipment</p>
                  <div className="flex items-center gap-2 text-sm text-blue-300">
                    Browse Collection
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            <Link
              to="/products?type=apparel"
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="aspect-[4/5] relative">
                <img
                  src="https://images.unsplash.com/photo-1746206673199-5b75dcec1018?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzaG9lcyUyMGNsb3RoaW5nfGVufDF8fHx8MTc2NTM2OTIxMXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Shoes & Clothing"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-white mb-2">Shoes/Clothing</h3>
                  <p className="text-sm text-gray-200 mb-3">Sports Apparel & Footwear</p>
                  <div className="flex items-center gap-2 text-sm text-blue-300">
                    Browse Collection
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="mb-3">Featured Products</h2>
                <p className="text-gray-600">
                  Premium equipment handpicked by our experts
                </p>
              </div>
              <Link
                to="/category/cricket"
                className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                View All Products
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm mb-4">
                Just Arrived
              </div>
              <h2 className="mb-3">New Arrivals</h2>
              <p className="text-gray-600">
                Latest additions to our sports equipment collection
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {featuredTestimonials.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="mb-4">What Our Customers Say</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Trusted by professional athletes, sports academies, and enthusiasts across India
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {featuredTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Visit Store CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-4 text-white">Visit Our Showroom</h2>
              <p className="text-xl mb-6 text-blue-100">
                Experience our extensive collection in person. Get hands-on feel of premium equipment with expert guidance from our team.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-300" />
                  <span className="text-blue-100">{storeInfo.address}, {storeInfo.city}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-300" />
                  <span className="text-blue-100">{storeInfo.phone[0]}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-900 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <MapPin className="w-5 h-5" />
                  Get Directions
                </Link>
                <a
                  href={`tel:${storeInfo.phone[0].replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-900 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call Us Now
                </a>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <h3 className="mb-4 text-white">Store Timings</h3>
              <div className="space-y-3 text-blue-100">
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span>Monday - Friday</span>
                  <span className="text-white">{storeInfo.workingHours.weekdays}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span>Saturday</span>
                  <span className="text-white">{storeInfo.workingHours.saturday}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Sunday</span>
                  <span className="text-white">{storeInfo.workingHours.sunday}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B2B CTA */}
      <section className="py-12 bg-blue-50 border-y border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="mb-2">Looking for Bulk Orders?</h3>
              <p className="text-gray-600">
                Register for B2B access and enjoy special pricing for academies, schools, and corporate orders
              </p>
            </div>
            <Link
              to="/b2b/register"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Register for B2B
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}