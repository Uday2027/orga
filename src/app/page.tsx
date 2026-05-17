import { HeroSection } from './sections/hero-section';
import { FeaturedProductsSection } from './sections/featured-products-section';
import { TestimonialsSection } from './sections/testimonials-section';
import { FeaturesSection } from './sections/features-section';
import type { Review } from '@/types';

async function getReviews(): Promise<Review[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/reviews`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const reviews = await getReviews();

  return (
    <>
      <HeroSection />
      <FeaturedProductsSection />
      <TestimonialsSection reviews={reviews} />
      <FeaturesSection />
    </>
  );
}
