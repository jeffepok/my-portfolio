import React from 'react';
import { builder } from "@builder.io/sdk";
import { getPrettyDate } from '../lib/utils';
builder.init((process.env.NEXT_PUBLIC_BUILDER_API_KEY!));


interface BlogPost {
    id: number;
    title: string;
    summary: string;
    date: string;
    readTime: string;
    tags: string[];
    imageUrl: string;
}
interface Post {
    title: string
    blurb: string
    handle: string
    date: Date
    image?: string
  }

const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: 'Testing Strategies in React',
        summary: 'A comprehensive guide to testing strategies in React.',
        date: '25. May, 2024',
        readTime: '6 min read',
        tags: ['Develop'],
        imageUrl: 'https://via.placeholder.com/600x400',
    },
    {
        id: 2,
        title: 'Introduction to Docusaurus',
        summary: 'An introduction to using Docusaurus for documentation.',
        date: '30. April, 2024',
        readTime: '3 min read',
        tags: ['Teach'],
        imageUrl: 'https://via.placeholder.com/600x400',
    },
    {
        id: 3,
        title: 'Exploring useEffectEvent',
        summary: 'Understanding the useEffectEvent in React.',
        date: '31. March, 2024',
        readTime: '3 min read',
        tags: ['Teach'],
        imageUrl: 'https://via.placeholder.com/600x400',
    },
    {
        id: 4,
        title: 'Integrating AI and Machine Learning',
        summary: 'A guide to integrating AI and Machine Learning into applications.',
        date: '29. February, 2024',
        readTime: '4 min read',
        tags: ['Teach'],
        imageUrl: 'https://via.placeholder.com/600x400',
    },
    {
        id: 5,
        title: 'Deep Dive into Version Control',
        summary: 'A detailed look at version control systems.',
        date: '15. January, 2024',
        readTime: '5 min read',
        tags: ['Study'],
        imageUrl: 'https://via.placeholder.com/600x400',
    },
];

const BlogListing: React.FC = async () => {

    const posts = await builder
        .getAll("blog-article", {
            prerender: false,
            // Include references, like the `author` ref
            options: { includeRefs: true },
            limit: 10
        });
    return (
        <div className="container mx-auto py-10 px-4 md:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post: any, index: number) => (
                    <div
                        key={index}
                        className={`relative rounded-lg overflow-hidden shadow-lg ${index === 0 ? 'md:col-span-2 lg:col-span-3' : ''
                            }`}
                    >
                        <a href={`/blog/${post.data.handle}`} className="block">
                            <img
                                className="w-full h-64 object-cover transition-transform duration-300 transform hover:scale-105"
                                src={post.data.image}
                                alt={post.data.title}
                            />
                        </a>
                        <div className="p-4 bg-gray-800 text-white">
                            <a href={`/blog/${post.data.handle}`} className="block">
                                <h2 className="text-2xl font-semibold mb-2">{post.data.title}</h2>
                            </a>
                            <p className="text-gray-400">{post.data.title}</p>
                            <div className="flex items-center text-gray-500 text-sm mt-2">
                                <span>{getPrettyDate(new Date(post.data.date))}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogListing;
