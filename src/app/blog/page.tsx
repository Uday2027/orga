import { Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Blog } from '@/types';

async function getBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/blogs`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">ব্লগ</h1>
        <p className="mt-2 text-gray-500">ভেষজ ও প্রাকৃতিক স্বাস্থ্য সম্পর্কে জানুন</p>
      </div>

      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Card key={blog._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {blog.image && (
                <div className="aspect-video bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString('bn-BD', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">{blog.excerpt}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {blog.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs bg-green-50 text-[#1B5E20] rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">এখনো কোনো ব্লগ পোস্ট নেই</p>
        </div>
      )}
    </div>
  );
}
