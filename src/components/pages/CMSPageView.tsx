import { useEffect } from 'react';
import { cmsPages } from '../../lib/data';

interface CMSPageViewProps {
  slug: string;
}

export function CMSPageView({ slug }: CMSPageViewProps) {
  const page = cmsPages.find((p) => p.slug === slug && p.active);

  useEffect(() => {
    if (page) {
      // Update page title and meta tags
      document.title = page.metaTitle || page.title;
      if (page.metaDescription) {
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
          metaDescription = document.createElement('meta');
          metaDescription.setAttribute('name', 'description');
          document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', page.metaDescription);
      }
    }
  }, [page]);

  if (!page) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="mb-4">Page Not Found</h1>
        <p className="text-gray-600">The page you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1>{page.title}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className="prose prose-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </div>
  );
}
