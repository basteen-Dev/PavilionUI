import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { X, Play } from 'lucide-react';
import { galleryAlbums, galleryMedia } from '../../lib/data';

export function AlbumPage() {
  const { slug } = useParams();
  const album = galleryAlbums.find((a) => a.slug === slug && a.active);
  const albumMedia = album
    ? galleryMedia.filter((m) => m.albumId === album.id).sort((a, b) => a.order - b.order)
    : [];

  const [lightboxMedia, setLightboxMedia] = useState<typeof albumMedia[0] | null>(null);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');

  const filteredMedia = filter === 'all' 
    ? albumMedia 
    : albumMedia.filter(m => m.type === filter);

  if (!album) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="mb-4">Album Not Found</h1>
        <p className="text-gray-600 mb-6">The album you&apos;re looking for doesn&apos;t exist.</p>
        <Link to="/gallery" className="text-blue-600 hover:text-blue-700">
          Back to Gallery →
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/gallery" className="text-blue-200 hover:text-white mb-4 inline-block">
            ← Back to Gallery
          </Link>
          <h1 className="mb-4">{album.name}</h1>
          {album.description && (
            <p className="text-xl text-blue-100">{album.description}</p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-300'
            }`}
          >
            All ({albumMedia.length})
          </button>
          <button
            onClick={() => setFilter('image')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'image'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-300'
            }`}
          >
            Photos ({albumMedia.filter(m => m.type === 'image').length})
          </button>
          <button
            onClick={() => setFilter('video')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'video'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-300'
            }`}
          >
            Videos ({albumMedia.filter(m => m.type === 'video').length})
          </button>
        </div>

        {/* Media Grid */}
        {filteredMedia.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedia.map((media) => (
              <div
                key={media.id}
                className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setLightboxMedia(media)}
              >
                <img
                  src={media.type === 'image' ? media.url : media.thumbnail}
                  alt={media.title || 'Gallery Image'}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {media.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-blue-600 ml-1" />
                    </div>
                  </div>
                )}
                {media.title && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-sm">{media.title}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📸</div>
            <h3 className="mb-2">No media found</h3>
            <p className="text-gray-600">No {filter === 'all' ? 'items' : filter === 'image' ? 'photos' : 'videos'} in this album</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxMedia && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxMedia(null)}
        >
          <button
            onClick={() => setLightboxMedia(null)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            {lightboxMedia.type === 'image' ? (
              <img
                src={lightboxMedia.url}
                alt={lightboxMedia.title || 'Gallery Image'}
                className="w-full h-auto max-h-[90vh] object-contain"
              />
            ) : (
              <div className="aspect-video">
                <iframe
                  src={lightboxMedia.url}
                  title={lightboxMedia.title || 'Video'}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            )}
            {lightboxMedia.title && (
              <p className="text-white text-center mt-4 text-lg">{lightboxMedia.title}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
