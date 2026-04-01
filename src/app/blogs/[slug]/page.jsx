import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getImageUrl } from '@/utils/imageUrl';
import { format } from 'date-fns';
import { Calendar, ArrowLeft, ArrowRight } from 'lucide-react';

async function getBlog(slug) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/blogs/slug/${slug}`, { cache: 'no-store' });
    const data = await res.json();
    return data.success ? data.data : null;
  } catch {
    return null;
  }
}

async function getRelatedBlogs(currentSlug) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/blogs?status=published`, { cache: 'no-store' });
    const data = await res.json();
    if (!data.success) return [];
    return data.data.filter(b => b.slug !== currentSlug).slice(0, 3);
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: 'Post Not Found | ATV Roatan' };
  return {
    title: blog.meta_title || `${blog.title} | ATV Roatan Blog`,
    description: blog.meta_description || blog.excerpt || 'Read the latest from ATV Roatan.',
    openGraph: {
      title: blog.meta_title || blog.title,
      description: blog.meta_description || blog.excerpt,
      images: blog.image ? [{ url: getImageUrl(blog.image) }] : [],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog || blog.status !== 'published') return notFound();

  const related = await getRelatedBlogs(slug);

  return (
    <main className="min-h-screen bg-white">
      {/* Cover Image */}
      {blog.image && (
        <div className="w-full max-h-[500px] overflow-hidden">
          <img
            src={getImageUrl(blog.image)}
            alt={blog.image_alt || blog.title}
            className="w-full h-full object-cover"
            style={{ maxHeight: '500px' }}
          />
        </div>
      )}

      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-[#00694B] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blogs" className="hover:text-[#00694B] transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-gray-600 line-clamp-1">{blog.title}</span>
        </nav>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1a1a1a] leading-tight mb-6">
          {blog.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500 pb-8 border-b border-gray-100 mb-8">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {blog.publishedAt ? format(new Date(blog.publishedAt), 'MMMM d, yyyy') : ''}
          </span>
        </div>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-xl text-gray-600 leading-relaxed mb-8 font-light border-l-4 border-[#00694B] pl-5 italic">
            {blog.excerpt}
          </p>
        )}

        {/* Content */}
        <div
          className="blog-content text-[#1a1a1a] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Back to Blog */}
        <div className="mt-14 pt-8 border-t border-gray-100">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-[#00694B] font-semibold hover:gap-3 transition-all"
          >
            <ArrowLeft size={16} /> Back to all posts
          </Link>
        </div>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="bg-gray-50 py-16 mt-10">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">More Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map(post => (
                <Link key={post._id} href={`/blogs/${post.slug}`} className="group block">
                  <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="aspect-video overflow-hidden bg-gray-100">
                      {post.image ? (
                        <img
                          src={getImageUrl(post.image)}
                          alt={post.image_alt || post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#00694B]/10 to-[#00694B]/30" />
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-gray-400 mb-2">
                        {post.publishedAt ? format(new Date(post.publishedAt), 'MMM d, yyyy') : ''}
                      </p>
                      <h3 className="font-bold text-[#1a1a1a] line-clamp-2 group-hover:text-[#00694B] transition-colors">
                        {post.title}
                      </h3>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-[#00694B] text-sm font-semibold group-hover:gap-2.5 transition-all">
                        Read more <ArrowRight size={14} />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Global blog content styles */}
      <style>{`
        .blog-content h1 { font-size: 2rem; font-weight: 800; margin: 2rem 0 1rem; color: #1a1a1a; }
        .blog-content h2 { font-size: 1.5rem; font-weight: 700; margin: 1.75rem 0 0.75rem; color: #1a1a1a; }
        .blog-content h3 { font-size: 1.25rem; font-weight: 700; margin: 1.5rem 0 0.5rem; color: #1a1a1a; }
        .blog-content p { margin-bottom: 1.25rem; color: #374151; font-size: 1.0625rem; line-height: 1.85; }
        .blog-content ul, .blog-content ol { padding-left: 1.75rem; margin-bottom: 1.25rem; color: #374151; }
        .blog-content ul { list-style: disc; }
        .blog-content ol { list-style: decimal; }
        .blog-content li { margin-bottom: 0.5rem; line-height: 1.75; }
        .blog-content a { color: #00694B; text-decoration: underline; font-weight: 500; }
        .blog-content a:hover { color: #005a3c; }
        .blog-content blockquote {
          border-left: 4px solid #00694B;
          padding: 0.75rem 1.25rem;
          margin: 1.5rem 0;
          background: #f0fdf4;
          border-radius: 0 8px 8px 0;
          font-style: italic;
          color: #374151;
        }
        .blog-content strong { font-weight: 700; color: #1a1a1a; }
        .blog-content em { font-style: italic; }
        .blog-content img { width: 100%; border-radius: 12px; margin: 1.5rem 0; }
        .blog-content hr { border: none; border-top: 1px solid #e5e7eb; margin: 2rem 0; }
        .blog-content pre { background: #1f2937; color: #f9fafb; padding: 1rem 1.25rem; border-radius: 8px; overflow-x: auto; margin-bottom: 1.25rem; font-size: 0.875rem; }
        .blog-content code { background: #f3f4f6; padding: 0.2rem 0.4rem; border-radius: 4px; font-size: 0.875rem; }
      `}</style>
    </main>
  );
}
