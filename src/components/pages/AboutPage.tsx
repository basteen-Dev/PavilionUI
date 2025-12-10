import { Trophy, Target, Heart, Award, Users, Shield } from 'lucide-react';

export function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-4">About Pavilion Sports</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Serving India&apos;s sporting community since 1988 with authentic equipment, expert guidance, and unwavering commitment to excellence
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="mb-6">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Founded in 1988, Pavilion Sports began with a simple vision: to provide Indian athletes and sports enthusiasts with access to the finest sports equipment available. What started as a small cricket equipment store has grown into one of India&apos;s most trusted multi-sport retailers.
            </p>
            <p className="text-gray-700 mb-4">
              Over three decades, we&apos;ve built our reputation on authenticity, expertise, and exceptional customer service. Our showroom houses India&apos;s largest collection of cricket bats, featuring equipment from the world&apos;s most prestigious brands.
            </p>
            <p className="text-gray-700">
              Today, Pavilion Sports serves professional athletes, sports academies, educational institutions, and recreational players across the country, maintaining the same commitment to quality that defined our founding principles.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600"
              alt="Cricket Equipment"
              className="rounded-lg shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1593766787879-e8c78e09cec5?w=600"
              alt="Sports Store"
              className="rounded-lg shadow-lg mt-8"
            />
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="mb-3">Authenticity</h3>
              <p className="text-gray-600">
                Every product we sell is 100% authentic, sourced directly from authorized manufacturers and distributors
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="mb-3">Expertise</h3>
              <p className="text-gray-600">
                Our team comprises experienced sports professionals who understand equipment and can guide you to the perfect choice
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="mb-3">Customer First</h3>
              <p className="text-gray-600">
                Your satisfaction and sporting success are our priorities. We&apos;re here to support your journey
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-12 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl mb-2">36+</div>
              <div className="text-blue-200">Years in Business</div>
            </div>
            <div>
              <div className="text-4xl mb-2">10,000+</div>
              <div className="text-blue-200">Products Available</div>
            </div>
            <div>
              <div className="text-4xl mb-2">50+</div>
              <div className="text-blue-200">Premium Brands</div>
            </div>
            <div>
              <div className="text-4xl mb-2">100,000+</div>
              <div className="text-blue-200">Happy Customers</div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <h2 className="text-center mb-12">Why Choose Pavilion Sports</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Trophy className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="mb-2">Largest Cricket Collection</h3>
                <p className="text-gray-600">
                  India&apos;s biggest inventory of cricket bats featuring English willow, Kashmir willow, and professional-grade equipment from SG, MRF, Kookaburra, Gray-Nicolls, and more
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="mb-2">Professional Guidance</h3>
                <p className="text-gray-600">
                  Our staff includes former players and certified coaches who can help you select equipment suited to your playing style and skill level
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="mb-2">Trusted by Professionals</h3>
                <p className="text-gray-600">
                  State-level cricketers, national players, sports academies, and educational institutions trust us for their equipment needs
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="mb-2">Warranty & Support</h3>
                <p className="text-gray-600">
                  All products come with manufacturer warranties and our dedicated after-sales support team is always available to assist you
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gray-50 rounded-2xl p-12 text-center">
          <h2 className="mb-4">Visit Our Showroom</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience our extensive collection firsthand. Our experts are ready to help you find the perfect equipment for your sporting needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+918023456789"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              📞 Call Us Now
            </a>
            <a
              href="/contact"
              className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
