import { Truck, Headphones, ShieldCheck, RefreshCw } from 'lucide-react';

const FEATURES = [
  {
    icon: Truck,
    title: 'দ্রুত ডেলিভারি',
    description: 'সারা বাংলাদেশে দ্রুত ডেলিভারি সেবা',
  },
  {
    icon: Headphones,
    title: 'সাপোর্ট ২৪/৭',
    description: 'সার্বক্ষণিক কাস্টমার সাপোর্ট',
  },
  {
    icon: ShieldCheck,
    title: '১০০% সেফ ও সিকিউর',
    description: 'নিরাপদ পেমেন্ট ও প্যাকেজিং',
  },
  {
    icon: RefreshCw,
    title: 'সহজ রিটার্ন',
    description: 'ঝামেলামুক্ত রিটার্ন পলিসি',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-14 lg:py-16 bg-[#1B5E20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-green-100">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
