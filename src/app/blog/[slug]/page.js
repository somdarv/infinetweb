// ✅ Remove "use client" to allow Server Features
import { Suspense } from 'react';
import BlogContent from '@/components/BlogContent';
import BlogDetailHeader from '@/components/BlogDetailHeader';
import Navigation from '@/components/Navigation';
import PageNav from '@/components/PageNav';
import ScrollToTop from '@/components/ScrollToTop';
import AuthorSignature from '@/components/AuthorSignature';
import DynamicBlogData from '@/components/DynamicBlogData'; // Moved Client Logic Here

// ✅ Function to generate static slugs
export async function generateStaticParams() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`, { timeout: 10000 }); // 10s timeout
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const blogs = await response.json();

        // 🔥 Handle case where API returns an empty array
        if (!blogs.posts || blogs.posts.length === 0) {
            return [{ slug: "no-blog-post" }]; // Provide a fallback slug
        }


        return blogs.posts.map((blog) => ({
            slug: blog.slug,
        }));
    } catch (error) {
        console.error("Error fetching blog slugs:", error);
        return [{slug: "no-blog-post"}]; // Return an empty array to prevent build failure
    }
}


// ✅ Server-Side Fetching
async function getBlogData(slug) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/slug/${slug}`, { cache: 'no-store' });
    if (!response.ok) return null;
    return response.json();
}

export default async function Page({ params }) {
    const { slug } = params;
    const postData = await getBlogData(slug);


    if (!postData) {
        return <div className="text-center text-red-500">Post Not Found</div>;
    }

    return (
        <div>
            <div className='w-full bg-primary'>
                <Navigation page={'Blog'} />
            </div>

            <div className='w-[90%] md:w-[50%] mx-auto my-4'>
                <Suspense fallback={<div>Loading header...</div>}>
                    <BlogDetailHeader
                        title={postData.post.title}
                        author={postData.post.authorName}
                        date={postData.post.createdAt}
                        imageUrl={postData.post.cover_art}
                        categories={postData.post.categories}
                    />
                </Suspense>
            </div>

            <div className='w-[90%] md:w-[50%] mx-auto'>
                <Suspense fallback={<div>Loading content...</div>}>
                    <BlogContent content={postData.post.content} />
                </Suspense>
            </div>

            <div className='w-[50%] mx-auto my-auto'>
                <Suspense fallback={<div>Loading signature...</div>}>
                    <AuthorSignature
                        name={postData.post.authorName}
                        role="Fullstack Software Developer"
                        image="/images/usericon.png"
                        bio={`${postData.post.authorName} is a tech enthusiast with over 8 years of experience in software development and technical writing. He's passionate about making complex topics accessible to everyone.`}
                        date={new Date(postData.post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    />
                </Suspense>
            </div>

            {/* ✅ Dynamic Blog Data using Redux */}
            <DynamicBlogData slug={slug} />

            {postData.post.prevPost || postData.post.nextPost ? (
                <div className='w-[50%] mx-auto'>
                    <Suspense fallback={<div>Loading navigation...</div>}>
                        <PageNav
                            prevPage={postData.post.prevPost?.slug && `/blog/${postData.post.prevPost.slug}`}
                            nextPage={postData.post.nextPost?.slug && `/blog/${postData.post.nextPost?.slug}`}
                            prevTitle={postData.post.prevPost?.title}
                            nextTitle={postData.post.nextPost?.title}
                            prevSubtitle="Prev"
                            nextSubtitle="Next"
                        />
                    </Suspense>
                </div>
            ) : null}

            <div className='w-[90%] md:w-[50%] mx-auto'>
                <ScrollToTop />
            </div>
        </div>
    );
}
