import { Target, Users, Award, TrendingUp } from 'lucide-react';

const STATS = [
  { icon: TrendingUp, value: '৫০০+', label: 'ভেষজ পণ্য' },
  { icon: Users, value: '১০,০০০+', label: 'সন্তুষ্ট গ্রাহক' },
  { icon: Award, value: '৫+', label: 'বছরের অভিজ্ঞতা' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#1B5E20] py-20 lg:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm mb-6">
            <Target className="w-4 h-4" />
            প্রকৃতির শ্রেষ্ঠ উপহার
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            আমাদের সম্পর্কে
          </h1>
          <p className="text-green-100 text-lg leading-relaxed max-w-2xl mx-auto">
            মা ভেষজ বাণিজ্যালয় — বাংলাদেশের একটি বিশ্বস্ত প্রাকৃতিক ভেষজ পণ্যের প্রতিষ্ঠান। আমরা বিশ্বাস করি প্রকৃতির মধ্যেই লুকিয়ে আছে সুস্থতার চাবিকাঠি।
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full text-[#1B5E20] text-sm font-medium mb-6">
            <Target className="w-4 h-4" />
            আমাদের লক্ষ্য
          </div>
          <div className="w-16 h-1 bg-[#1B5E20] mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 text-lg leading-relaxed">
            প্রকৃতির শক্তিতে সুস্থ থাকুন। আমাদের লক্ষ্য হলো বাংলাদেশের প্রতিটি মানুষের কাছে বিশুদ্ধ ও প্রাকৃতিক ভেষজ পণ্য সরবরাহ করা।
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-20 bg-[#F8FAF8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100"
              >
                <stat.icon className="w-8 h-8 text-[#1B5E20] mx-auto mb-4" />
                <div className="text-3xl font-bold text-[#1B5E20] mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
