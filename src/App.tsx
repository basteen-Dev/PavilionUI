import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/pages/HomePage';
import { ProductsPage } from './components/pages/ProductsPage';
import { CategoryPage } from './components/pages/CategoryPage';
import { SubcategoryPage } from './components/pages/SubcategoryPage';
import { BrandPage } from './components/pages/BrandPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { SearchPage } from './components/pages/SearchPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { CareersPage } from './components/pages/CareersPage';
import { JobDetailPage } from './components/pages/JobDetailPage';
import { GalleryPage } from './components/pages/GalleryPage';
import { AlbumPage } from './components/pages/AlbumPage';
import { CMSPageView } from './components/pages/CMSPageView';
import { B2BLogin } from './components/pages/b2b/B2BLogin';
import { B2BRegister } from './components/pages/b2b/B2BRegister';
import { B2BDashboard } from './components/pages/b2b/B2BDashboard';
import { B2BOrders } from './components/pages/b2b/B2BOrders';
import { B2BCreateOrder } from './components/pages/b2b/B2BCreateOrder';
import { B2BProfile } from './components/pages/b2b/B2BProfile';

export default function App() {
  useEffect(() => {
    // Google Analytics G4
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    document.head.appendChild(gaScript);

    const gaConfig = document.createElement('script');
    gaConfig.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    `;
    document.head.appendChild(gaConfig);

    // Microsoft Clarity
    const clarityScript = document.createElement('script');
    clarityScript.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "YOUR_CLARITY_ID");
    `;
    document.head.appendChild(clarityScript);

    return () => {
      document.head.removeChild(gaScript);
      document.head.removeChild(gaConfig);
      document.head.removeChild(clarityScript);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/search" element={<SearchPage />} />
            
            {/* Category & Product Routes */}
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/subcategory/:slug" element={<SubcategoryPage />} />
            <Route path="/brand/:slug" element={<BrandPage />} />
            <Route path="/product/:slug" element={<ProductDetailPage />} />
            
            {/* Static Pages */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Careers */}
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/careers/:slug" element={<JobDetailPage />} />
            
            {/* Gallery */}
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/gallery/:slug" element={<AlbumPage />} />
            
            {/* CMS Pages */}
            <Route path="/privacy-policy" element={<CMSPageView slug="privacy-policy" />} />
            <Route path="/terms-conditions" element={<CMSPageView slug="terms-conditions" />} />
            
            {/* B2B Portal */}
            <Route path="/b2b/login" element={<B2BLogin />} />
            <Route path="/b2b/register" element={<B2BRegister />} />
            <Route path="/b2b/dashboard" element={<B2BDashboard />} />
            <Route path="/b2b/orders" element={<B2BOrders />} />
            <Route path="/b2b/create-order" element={<B2BCreateOrder />} />
            <Route path="/b2b/profile" element={<B2BProfile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}