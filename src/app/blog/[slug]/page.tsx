import React from "react";
import { builder } from "@builder.io/sdk";
import { getPrettyDate } from "@/app/lib/utils";
import { FiMoreHorizontal } from "react-icons/fi";
import './styles.css';
import dynamic from "next/dynamic";
const CodeRenderer = dynamic(() => import('@/components/ui/codeRenderer'), { ssr: false })
// Replace with your Public API Key
builder.init((process.env.NEXT_PUBLIC_BUILDER_API_KEY!));

export default async function BlogArticle({ params }: { params: { slug: string } }) {
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
                className="text-white text-left bg-[#15212d] md:container py-10 px-5 md:px-20 mx-2 md:mx-auto border border-transparent border-t-2 border-t-teal-300">
                <CodeRenderer content={content} language=""/>
            </div>
            <div className="text-center mt-10 text-gray-400 mb-20">
                <a href={`/blog`}>Back to Overview<FiMoreHorizontal className="mx-auto" /></a>
            </div>
        </div>
    );
}