import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ma_bheshaj';

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  // Clear existing data
  await mongoose.connection.dropDatabase();
  console.log('Cleared database');

  // Categories
  const categories = [
    { name: 'ভেষজ', slug: 'bheshaj', isActive: true },
    { name: 'টি-পাতা', slug: 'tea-leaves', isActive: true },
    { name: 'গুঁড়ো', slug: 'powder', isActive: true },
    { name: 'রুপচর্চা', slug: 'beauty', isActive: true },
    { name: 'হাট কালেকশন', slug: 'heart-collection', isActive: true },
    { name: 'কাঠা', slug: 'katha', isActive: true },
  ];
  await mongoose.connection.collection('categories').insertMany(categories);
  console.log('Seeded categories');

  // Products
  const products = [
    {
      name: 'পঞ্চগুট্ট Raw উপাদান',
      slug: 'panchagutta-raw-upadan',
      description: 'পঞ্চগুট্ট একটি প্রাচীন ভেষজ উপাদান যা শরীরের রোগ প্রতিরোধ ক্ষমতা বাড়াতে সাহায্য করে।',
      price: 8850,
      comparePrice: 9500,
      images: [{ url: 'https://picsum.photos/seed/panchagutta/600/600' }],
      category: 'ভেষজ',
      tags: ['ভেষজ', 'পাউডার', 'স্বাস্থ্য'],
      stock: 50,
      isFeatured: true,
      isActive: true,
    },
    {
      name: 'হাফ কেজি রোজেলা চা',
      slug: 'half-kg-rojela-cha',
      description: 'রোজেলা চা রক্তচাপ নিয়ন্ত্রণ ও ওজন কমাতে সাহায্য করে।',
      price: 6750,
      images: [{ url: 'https://picsum.photos/seed/rojela/600/600' }],
      category: 'টি-পাতা',
      tags: ['চা', 'রোজেলা', 'স্বাস্থ্য'],
      stock: 30,
      isFeatured: true,
      isActive: true,
    },
    {
      name: '৫০০ গ্রাম অর্জুন হাট কেয়ার + ২০০ গ্রাম মোহর যাদু কম্বো প্যাক',
      slug: 'arjun-heart-care-mohar-jadu-combo',
      description: 'হার্টের স্বাস্থ্য রক্ষায় অর্জুন ছাল এবং মোহর যাদুর বিশেষ কম্বো প্যাক।',
      price: 8650,
      comparePrice: 9200,
      images: [{ url: 'https://picsum.photos/seed/arjun/600/600' }],
      category: 'হাট কালেকশন',
      tags: ['হার্ট', 'অর্জুন', 'ভেষজ'],
      stock: 25,
      isFeatured: true,
      isActive: true,
    },
    {
      name: 'Spray Dried Beetroot 200 Gram',
      slug: 'spray-dried-beetroot-200g',
      description: 'স্প্রে ড্রাইড বিটরুট পাউডার। রক্তশূন্যতা দূর করতে ও শক্তি বাড়াতে সাহায্য করে।',
      price: 6950,
      images: [{ url: 'https://picsum.photos/seed/beetroot/600/600' }],
      category: 'গুঁড়ো',
      tags: ['বিটরুট', 'পাউডার', 'স্বাস্থ্য'],
      stock: 40,
      isFeatured: true,
      isActive: true,
    },
    {
      name: '৫০০ গ্রাম বিটরুট পাউডার',
      slug: '500g-beetroot-powder',
      description: '১০০% প্রাকৃতিক বিটরুট পাউডার। রক্তের হিমোগ্লোবিন বাড়াতে সাহায্য করে।',
      price: 6450,
      images: [{ url: 'https://picsum.photos/seed/beetroot2/600/600' }],
      category: 'গুঁড়ো',
      tags: ['বিটরুট', 'পাউডার'],
      stock: 35,
      isFeatured: true,
      isActive: true,
    },
    {
      name: 'হাফ কেজি সজনে পাতা গুঁড়ো',
      slug: 'half-kg-sojne-pata-guro',
      description: 'সজনে পাতার গুঁড়ো। ডায়াবেটিস নিয়ন্ত্রণে ও হাড় মজবুত করতে সাহায্য করে।',
      price: 6350,
      images: [{ url: 'https://picsum.photos/seed/sojne/600/600' }],
      category: 'গুঁড়ো',
      tags: ['সজনে', 'পাউডার', 'ডায়াবেটিস'],
      stock: 45,
      isFeatured: true,
      isActive: true,
    },
    {
      name: 'রোজেলা চা',
      slug: 'rojela-cha',
      description: 'প্রিমিয়াম কোয়ালিটি রোজেলা চা। স্বাস্থ্যের জন্য উপকারী।',
      price: 6450,
      comparePrice: 6900,
      images: [{ url: 'https://picsum.photos/seed/rojela2/600/600' }],
      category: 'টি-পাতা',
      tags: ['চা', 'রোজেলা'],
      stock: 60,
      isFeatured: true,
      isActive: true,
    },
    {
      name: 'সজনে পাতা গুঁড়ো',
      slug: 'sojne-pata-guro',
      description: 'সজনে পাতার তাজা গুঁড়ো। প্রাকৃতিক পুষ্টির ভাণ্ডার।',
      price: 6350,
      comparePrice: 6850,
      images: [{ url: 'https://picsum.photos/seed/sojne2/600/600' }],
      category: 'গুঁড়ো',
      tags: ['সজনে', 'পাউডার'],
      stock: 30,
      isFeatured: true,
      isActive: true,
    },
    {
      name: 'মেহেদী মিক্স হেয়ার প্যাক পাউডার',
      slug: 'mehedi-mix-hair-pack',
      description: 'প্রাকৃতিক মেহেদী মিক্স হেয়ার প্যাক। চুল পড়া কমাতে ও চুলের গুণগত মান বাড়াতে সাহায্য করে।',
      price: 4950,
      images: [{ url: 'https://picsum.photos/seed/mehedi/600/600' }],
      category: 'রুপচর্চা',
      tags: ['মেহেদী', 'চুল', 'রুপচর্চা'],
      stock: 40,
      isFeatured: false,
      isActive: true,
    },
    {
      name: 'ঔষধি কাঠা কম্বো',
      slug: 'oushodi-katha-combo',
      description: 'বিভিন্ন ঔষধি কাঠার কম্বো প্যাক। শরীরের রোগ প্রতিরোধ ক্ষমতা বাড়াতে সাহায্য করে।',
      price: 5250,
      images: [{ url: 'https://picsum.photos/seed/katha/600/600' }],
      category: 'কাঠা',
      tags: ['কাঠা', 'ঔষধি', 'ভেষজ'],
      stock: 20,
      isFeatured: false,
      isActive: true,
    },
  ];
  await mongoose.connection.collection('products').insertMany(products);
  console.log('Seeded products');

  // Reviews
  const reviews = [
    {
      name: 'সাবিনা ইয়াসমিন',
      initials: 'সই',
      rating: 5,
      text: 'বাচ্চার জন্য টি-পাতা নিয়েছিলাম, কোয়ালিটি অনেক নরম আর সাইজও প্রায়ভালো। বাচ্চা পড়ে অনেক আরাম পাচ্ছে!',
      isActive: true,
    },
    {
      name: 'নুসরাত জাহান',
      initials: 'নজ',
      rating: 5,
      text: 'শীতে জন্য গোলা নিয়েছিলাম, মান অনেক ভালো এবং ডেলিভারিও দ্রুত হয়েছে। বাচ্চাকে অনেক কিছু লাগছে!',
      isActive: true,
    },
    {
      name: 'তানিয়া আক্তার',
      initials: 'তা',
      rating: 5,
      text: 'প্রথম অনুযায়ী কোয়ালিটি দারুণ। ছোট ভাইয়ের জন্য রুপচর্চা নিয়েছি, পরিবারের সবাই খুশি।',
      isActive: true,
    },
  ];
  await mongoose.connection.collection('reviews').insertMany(reviews);
  console.log('Seeded reviews');

  // Blogs
  const blogs = [
    {
      title: 'ভেষজ পণ্যের উপকারিতা জানুন',
      slug: 'bheshaj-ponner-upokarita',
      excerpt: 'প্রাকৃতিক ভেষজ পণ্য ব্যবহারের বিভিন্ন উপকারিতা সম্পর্কে বিস্তারিত জানুন।',
      content: 'ভেষজ পণ্য প্রাকৃতিক উপাদান দিয়ে তৈরি হয়। এগুলো শরীরের কোনো ক্ষতি করে না। নিয়মিত ব্যবহারে শরীর সুস্থ ও সবল থাকে।',
      image: 'https://picsum.photos/seed/blog1/800/450',
      tags: ['ভেষজ', 'স্বাস্থ্য'],
      isPublished: true,
    },
    {
      title: 'রোজেলা চা পানের উপকারিতা',
      slug: 'rojela-cha-paner-upokarita',
      excerpt: 'রোজেলা চা রক্তচাপ নিয়ন্ত্রণ ও ওজন কমাতে কীভাবে সাহায্য করে।',
      content: 'রোজেলা চা প্রতিদিন পান করলে উচ্চ রক্তচাপ নিয়ন্ত্রণে থাকে। এছাড়াও এটি ওজন কমাতে সাহায্য করে।',
      image: 'https://picsum.photos/seed/blog2/800/450',
      tags: ['চা', 'রোজেলা'],
      isPublished: true,
    },
    {
      title: 'প্রাকৃতিক চুলের যত্ন',
      slug: 'prakritik-chuler-jotno',
      excerpt: 'মেহেদী ও প্রাকৃতিক উপাদান দিয়ে কীভাবে চুলের যত্ন নেবেন।',
      content: 'প্রাকৃতিক মেহেদী ব্যবহারে চুল পড়া কমে এবং চুল মজবুত হয়। নিয়মিত ব্যবহারে চুল কালো ও ঘন হয়।',
      image: 'https://picsum.photos/seed/blog3/800/450',
      tags: ['চুল', 'রুপচর্চা'],
      isPublished: true,
    },
  ];
  await mongoose.connection.collection('blogs').insertMany(blogs);
  console.log('Seeded blogs');

  console.log('\n✅ Seed completed successfully!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
