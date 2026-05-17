import { Star } from 'lucide-react';
import type { Review } from '@/types';

interface TestimonialsSectionProps {
  reviews: Review[];
}

export function TestimonialsSection({ reviews }: TestimonialsSectionProps) {
  return (
    <section className="py-16 lg:py-20 bg-[#F8FAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            গ্রাহকদের মতামত
          </h2>
          <div className="w-16 h-1 bg-[#1B5E20] mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-gray-500">
            আমাদের সম্মানিত গ্রাহকদের মতামত
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {review.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
