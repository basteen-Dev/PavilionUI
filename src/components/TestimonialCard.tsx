import { Star } from 'lucide-react';
import { Testimonial } from '../lib/data';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>

      <p className="text-gray-700 mb-4 italic">
        &quot;{testimonial.content}&quot;
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div>
          <div className="text-gray-900">{testimonial.author}</div>
          {testimonial.role && (
            <div className="text-sm text-gray-500">{testimonial.role}</div>
          )}
        </div>
        <div className="text-sm text-gray-400">
          {new Date(testimonial.date).toLocaleDateString('en-IN', {
            month: 'short',
            year: 'numeric',
          })}
        </div>
      </div>
    </div>
  );
}
