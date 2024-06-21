import React from "react";
import { builder } from "@builder.io/sdk";
import { getPrettyDate } from "@/app/lib/utils";
import { FiMoreHorizontal } from "react-icons/fi";
import './styles.css';

// Replace with your Public API Key
builder.init((process.env.NEXT_PUBLIC_BUILDER_API_KEY!));

interface PathnameDisplayProps {
    pathname: string;
}
  
export default async function BlogArticle({ params }: { params: { slug: string } }) {
    const model = "blog-article";
    const content = await builder
        .get("blog-article", {
            prerender: false,
            // Include references, like the `author` ref
            options: { includeRefs: true },
            query: {
                // Get the specific article by handle
                "data.handle": params.slug,
            },
        })
        .toPromise();

    return (
        <div>
            <div className="text-4xl text-center text-white mb-12 mt-28">
                <p className="mb-5">{content.data.title}</p>
                <p className="text-xl text-teal-300">{getPrettyDate(new Date(content.data.date))}</p>
            </div>
            <div
                dangerouslySetInnerHTML={{ __html: content.data.content }}
                className="text-white text-left bg-[#15212d] w-3/4 py-10 px-20 mx-auto border border-transparent border-t-2 border-t-teal-300">
            </div>
            <div className="text-center mt-10 text-gray-400 mb-20">
                <a href={`/blog`}>Back to Overview<FiMoreHorizontal className="mx-auto" /></a>
            </div>
        </div>
    );
}