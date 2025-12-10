import { Link } from 'react-router-dom';
import { Image, Video } from 'lucide-react';
import { galleryAlbums, galleryMedia } from '../../lib/data';

export function GalleryPage() {
  const activeAlbums = galleryAlbums.filter(a => a.active).sort((a, b) => a.order - b.order);

  const getAlbumMediaCount = (albumId: string) => {
    return galleryMedia.filter(m => m.albumId === albumId).length;
  };

  const getAlbumMediaType = (albumId: string) => {
    const media = galleryMedia.filter(m => m.albumId === albumId);
    const photos = media.filter(m => m.type === 'image').length;
    const videos = media.filter(m => m.type === 'video').length;
    return { photos, videos };
  };

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-4">Gallery</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Explore our collection of products, store ambiance, events, and memorable moments
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {activeAlbums.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeAlbums.map((album) => {
              const { photos, videos } = getAlbumMediaType(album.id);
              const totalMedia = getAlbumMediaCount(album.id);

              return (
                <Link
                  key={album.id}
                  to={`/gallery/${album.slug}`}
                  className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all"
                >
                  <div className="aspect-video overflow-hidden bg-gray-100 relative">
                    <img
                      src={album.coverImage}
                      alt={album.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex items-center gap-3 text-sm">
                          {photos > 0 && (
                            <span className="flex items-center gap-1">
                              <Image className="w-4 h-4" />
                              {photos}
                            </span>
                          )}
                          {videos > 0 && (
                            <span className="flex items-center gap-1">
                              <Video className="w-4 h-4" />
                              {videos}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 group-hover:text-blue-600 transition-colors">
                      {album.name}
                    </h3>
                    {album.description && (
                      <p className="text-sm text-gray-600 mb-3">{album.description}</p>
                    )}
                    <div className="text-sm text-gray-500">
                      {totalMedia} {totalMedia === 1 ? 'item' : 'items'}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📸</div>
            <h2 className="mb-2">No albums available</h2>
            <p className="text-gray-600">Check back soon for new photo and video galleries</p>
          </div>
        )}
      </div>
    </div>
  );
}
