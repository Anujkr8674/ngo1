import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Clock, ArrowRight } from "lucide-react";
import blogsData from "../../data/blogs.json";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogsData.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = blogsData.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  // Calculate read time
  const totalWords = blog.paragraphs.reduce((acc, p) => acc + p.split(" ").length, 0);
  const readTime = Math.max(1, Math.ceil(totalWords / 200));

  // Related blogs
  const related = blogsData.filter((b) => b.slug !== slug).slice(0, 2);

  return (
    <div className="flex flex-col w-full">
      {/* Intro Hero with dynamic article cover background */}
      <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 text-center min-h-[50vh]">
        {/* Full-size Hero Background */}
        {blog.images && blog.images.length > 0 && (
          <div className="absolute inset-0 z-0">
            <img
              src={blog.images[0]}
              alt={blog.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#FCFCFA]/30" />
          </div>
        )}

        {/* Floating Glassmorphism Hero Content Card */}
        <div className="max-w-4xl mx-auto w-full z-10 relative">
          <div className="glass-panel bg-[#FCFCFA]/90 backdrop-blur-md p-8 sm:p-12 md:p-16 rounded-[2.5rem] border border-white/60 shadow-premium text-center flex flex-col items-center gap-6">
            {/* Back Link */}
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-xs font-semibold text-foreground/60 hover:text-foreground mb-2 group bg-white/50 px-4 py-1.5 rounded-full shadow-soft"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to journal
            </Link>
            
            <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-semibold tracking-wider text-foreground/50 uppercase">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-secondary" />{blog.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-secondary" />{readTime} Min Read</span>
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-secondary" />By {blog.author}</span>
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight leading-none max-w-3xl">
              {blog.title}
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full py-16">

        {/* Featured Image */}
        {blog.images && blog.images.length > 0 && (
          <div className="aspect-[16/9] w-full rounded-[2.5rem] relative overflow-hidden bg-foreground/5 shadow-premium border border-white mb-12">
            <img referrerPolicy="no-referrer"
              src={blog.images[0]}
              alt={blog.title}
              
              
              className="w-full h-full object-cover absolute inset-0 object-cover"
            />
          </div>
        )}

        {/* Article Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 flex flex-col gap-6 font-sans text-sm sm:text-base text-foreground/85 leading-relaxed">
            {blog.paragraphs.map((p, i) => {
              // Check if we should render a subheading before this paragraph (just arbitrary slot layout)
              const sub = blog.subheadings && blog.subheadings[i];
              return (
                <div key={i} className="flex flex-col gap-4">
                  {sub && (
                    <h3 className="font-display font-bold text-2xl text-foreground mt-6 pt-4 border-t border-foreground/5">
                      {sub.text}
                    </h3>
                  )}
                  <p>{p}</p>
                </div>
              );
            })}
          </div>

          {/* Sidebar / Sponsoring callout */}
          <aside className="lg:col-span-4 p-8 rounded-3xl glass-panel border border-white/80 shadow-soft flex flex-col gap-6">
            <h4 className="font-display font-bold text-lg text-foreground">Sponsor this Work</h4>
            <p className="text-xs text-foreground/75 leading-relaxed">
              Help us expand campaigns like this. 100% of your contributions go directly into field logistics.
            </p>
            <Link href="/donate" className="w-full">
              <button className="w-full py-3 rounded-full text-xs font-semibold text-foreground bg-primary hover:bg-[#b8daff] transition-premium shadow-soft cursor-pointer">
                Donate Now
              </button>
            </Link>
          </aside>
        </div>

        {/* Gallery grid of additional photos if any */}
        {blog.images && blog.images.length > 1 && (
          <section className="mt-16 pt-12 border-t border-foreground/5">
            <h3 className="font-display font-bold text-2xl text-foreground mb-8">Campaign Photographs</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {blog.images.slice(1).map((img, i) => (
                <div key={i} className="aspect-square rounded-2xl relative overflow-hidden bg-foreground/5 shadow-soft border border-white">
                  <img referrerPolicy="no-referrer"
                    src={img}
                    alt={`${blog.title} gallery image ${i + 1}`}
                    
                    
                    className="w-full h-full object-cover absolute inset-0 object-cover hover:scale-103 transition-premium"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Posts */}
        <section className="mt-20 pt-16 border-t border-foreground/10">
          <h3 className="font-display font-bold text-2xl text-foreground mb-10">Related Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {related.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
                <div className="flex flex-col gap-4 p-5 rounded-2xl glass-panel hover:shadow-soft border border-white transition-premium">
                  {post.images && post.images.length > 0 && (
                    <div className="aspect-[16/10] rounded-xl relative overflow-hidden bg-foreground/5">
                      <img referrerPolicy="no-referrer"
                        src={post.images[0]}
                        alt={post.title}
                        
                        
                        className="w-full h-full object-cover absolute inset-0 object-cover group-hover:scale-102 transition-premium"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-foreground/45 uppercase tracking-wider font-semibold">{post.date}</span>
                    <h4 className="font-display font-bold text-lg text-foreground group-hover:text-secondary leading-snug transition-colors">
                      {post.title}
                    </h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
