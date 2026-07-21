import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Clock, BookOpen } from "lucide-react";
import prisma from "@/lib/prisma";
import { getBlogPostBySlug } from "@/app/actions/blog";
import BlogMediaSection from "@/app/components/BlogMediaSection";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const blogs = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true }
    });
    return blogs.map((blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error("Error in generateStaticParams for blogs:", error);
    return [];
  }
}

// Fixed cover image URL for all blog posts header
const FIXED_COVER_IMAGE = "https://live4help.org/wp-content/uploads/2023/07/Medical-Camp-Photo.jpg";

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogPostBySlug(slug);

  if (!blog) {
    notFound();
  }

  const readTime = blog.readTime || 3;

  // Retrieve recent blogs for the right sidebar
  let recentPosts: any[] = [];
  try {
    recentPosts = await prisma.blogPost.findMany({
      where: {
        slug: { not: slug },
        published: true
      },
      take: 6,
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.error("Error retrieving recent blogs:", error);
  }

  const blogDate = blog.createdAt ? new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }) : "June 1, 2026";

  return (
    <div className="flex flex-col w-full">
      {/* Scoped CSS styling for rich-text HTML rendering */}
      <style dangerouslySetInnerHTML={{__html: `
        .blog-content-prose {
          width: 100%;
        }
        .blog-content-prose h1 {
          font-size: 1.875rem;
          line-height: 2.25rem;
          font-weight: 700;
          color: #1e293b;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .blog-content-prose h2 {
          font-size: 1.5rem;
          line-height: 2rem;
          font-weight: 700;
          color: #1e293b;
          margin-top: 1.75rem;
          margin-bottom: 0.875rem;
        }
        .blog-content-prose h3 {
          font-size: 1.25rem;
          line-height: 1.75rem;
          font-weight: 700;
          color: #1e293b;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          padding-top: 1rem;
        }
        .blog-content-prose p {
          margin-bottom: 1.25rem;
          line-height: 1.8;
          color: #334155;
          width: 100%;
          font-size: 1.05rem;
        }
        .blog-content-prose ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .blog-content-prose ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .blog-content-prose li {
          margin-bottom: 0.5rem;
          line-height: 1.6;
          color: #334155;
        }
        .blog-content-prose img {
          max-width: 100%;
          height: auto;
          border-radius: 1rem;
          margin: 1.5rem 0;
        }
        .blog-content-prose blockquote {
          border-left: 4px solid #DCCFF8;
          padding-left: 1.25rem;
          font-style: italic;
          color: #475569;
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
          background: #f8fafc;
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
          border-radius: 0 0.75rem 0.75rem 0;
        }
        .blog-content-prose hr {
          border: 0;
          border-top: 1px solid #e2e8f0;
          margin: 2rem 0;
        }
      `}} />

      {/* Intro Hero with FIXED cover background for all posts */}
      <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 text-center min-h-[90vh]">
        {/* Fixed Cover Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={FIXED_COVER_IMAGE}
            alt="Web Post Cover Header"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto w-full z-10 relative">
          <div className="w-full text-center flex flex-col items-center gap-5">
            {/* Back Link */}
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white mb-2 group px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md transition-all shadow-soft border border-white/10"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to Web Posts
            </Link>
            
            <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-semibold tracking-wider text-white/70 uppercase">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-blue-300" />{blogDate}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-blue-300" />{readTime} Min Read</span>
              <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-blue-300" />By {blog.author || 'Admin'}</span>
            </div>
            
            <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-tight max-w-3xl">
              {blog.title || 'BLOG'}
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content Layout with 2 Columns */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full py-12">
        <div className="bg-white rounded-[3rem] p-6 md:p-12 border border-foreground/10 shadow-premium">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Full-width Paragraph & Media Section with Lightbox */}
            <BlogMediaSection 
              images={blog.images || []} 
              title={blog.title} 
              excerpt={blog.excerpt} 
              content={blog.content} 
            />

            {/* Right Column: Recent Posts Sidebar */}
            <aside className="lg:col-span-4 w-full space-y-6 sticky top-24">
              <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                <h3 className="font-display font-bold text-base text-slate-800 mb-5 pb-3 border-b border-slate-200 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Recent Web Posts
                </h3>

                {recentPosts.length === 0 ? (
                  <p className="text-xs text-slate-400">No other posts available.</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {recentPosts.map((post) => (
                      <Link 
                        key={post.id} 
                        href={`/blog/${post.slug}`}
                        className="group flex gap-3.5 items-center p-2.5 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-200 border border-transparent hover:border-slate-200/60"
                      >
                        {post.images && post.images.length > 0 ? (
                          <div className="w-20 h-16 rounded-lg overflow-hidden relative shrink-0 border border-slate-200 bg-slate-100">
                            <img
                              src={post.images[0]}
                              alt={post.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-16 rounded-lg bg-slate-200 shrink-0 flex items-center justify-center text-slate-400">
                            <BookOpen className="w-6 h-6 text-slate-400" />
                          </div>
                        )}
                        <div className="flex flex-col min-w-0 flex-1">
                          <h4 className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 line-clamp-2 leading-snug transition-colors">
                            {post.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 mt-1 font-medium">
                            {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </aside>

          </div>
        </div>
      </div>
    </div>
  );
}
