import Link from 'next/link';
import { getImageUrl } from '@/utils/imageUrl';
import { format } from 'date-fns';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Blog | ATV Roatan — Roatan Tours & Excursions',
  description: 'Read our latest articles about Roatan shore excursions, ATV tours, island tips, and travel guides for Honduras.',
};

async function getBlogs() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/blogs?status=published`, {
      cache: 'no-store',
    });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch {
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();
  const [featured, ...rest] = blogs;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="bg-[#00694B] text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            <BookOpen size={15} />
            Roatan Travel Blog
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Stories, Tips &amp; Island Guides
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Discover the best of Roatan — from hidden beaches and ATV adventures to cruise excursion tips and local secrets.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {blogs.length === 0 ? (
          <div className="text-center py-24">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-xl font-semibold">No posts yet</p>
            <p className="text-gray-400 mt-2">Check back soon for travel tips and island stories.</p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featured && (
              <div className="mb-14">
                <p className="text-xs text-[#00694B] font-bold uppercase tracking-widest mb-4">Featured Post</p>
                <Link href={`/blogs/${featured.slug}`} className="group block">
                  <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 grid md:grid-cols-2">
                    <div className="relative aspect-video md:aspect-auto overflow-hidden bg-gray-100">
                      {featured.image ? (
                        <img
                          src={getImageUrl(featured.image)}
                          alt={featured.image_alt || featured.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#00694B]/10 to-[#00694B]/30">
                          <BookOpen size={60} className="text-[#00694B]/40" />
                        </div>
                      )}
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                        <span className="flex items-center gap-1"><User size={12} /> {featured.author || 'Admin'}</span>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {featured.publishedAt ? format(new Date(featured.publishedAt), 'MMM d, yyyy') : ''}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-3 group-hover:text-[#00694B] transition-colors leading-tight">
                        {featured.title}
                      </h2>
                      {featured.excerpt && (
                        <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3">{featured.excerpt}</p>
                      )}
                      <span className="inline-flex items-center gap-2 text-[#00694B] font-semibold text-sm group-hover:gap-3 transition-all">
                        Read Article <ArrowRight size={16} />
                      </span>
                    </div>
                  </article>
                </Link>
              </div>
            )}

            {/* Remaining Grid */}
            {rest.length > 0 && (
              <>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-6">More Articles</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rest.map(blog => (
                    <Link key={blog._id} href={`/blogs/${blog.slug}`} className="group block">
                      <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                        <div className="aspect-video overflow-hidden bg-gray-100">
                          {blog.image ? (
                            <img
                              src={getImageUrl(blog.image)}
                              alt={blog.image_alt || blog.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#00694B]/10 to-[#00694B]/30">
                              <BookOpen size={36} className="text-[#00694B]/40" />
                            </div>
                          )}
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                            <span className="flex items-center gap-1"><User size={11} /> {blog.author || 'Admin'}</span>
                            <span className="flex items-center gap-1">
                              <Calendar size={11} />
                              {blog.publishedAt ? format(new Date(blog.publishedAt), 'MMM d, yyyy') : ''}
                            </span>
                          </div>
                          <h2 className="font-bold text-[#1a1a1a] text-lg mb-2 group-hover:text-[#00694B] transition-colors line-clamp-2 leading-snug">
                            {blog.title}
                          </h2>
                          {blog.excerpt && (
                            <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">{blog.excerpt}</p>
                          )}
                          <span className="mt-4 inline-flex items-center gap-1.5 text-[#00694B] text-sm font-semibold group-hover:gap-2.5 transition-all">
                            Read more <ArrowRight size={14} />
                          </span>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}
