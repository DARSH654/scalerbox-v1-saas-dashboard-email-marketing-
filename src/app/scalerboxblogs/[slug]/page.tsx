import { blogPosts } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import { BlogContent } from "@/components/blog-content";

export function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return <BlogContent post={post} />;
}
