'use client';

import { useState, useEffect } from 'react';
import { getBlogBySlug } from '@/stores/actions/blogAction';

export default function DynamicBlogData({ slug }) {
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/slug/${slug}`, { cache: 'no-store' });
                if (!response.ok) return null;

                setPost(response.post);
            } catch (error) {
                console.log('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };

        if (slug === "no-blog-post") {
            return <div className="text-center text-gray-500">No blog posts available yet.</div>;
        }

        if (slug) fetchData();
    }, [slug]);

    if (!post) {
        return <div className="text-center text-red-500">Post Not Found</div>;
    }

    return (
        <div className="text-center text-sm text-gray-500">
            {loading ? "Fetching additional blog data..." : ""}
        </div>
    );
}
