import React from "react";
import { ComponentProps } from "react";
import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder";
import Head from "next/head";
import { BuilderComponent } from "@builder.io/react";
import { getPrettyDate } from "@/app/lib/utils";
import { FiMoreHorizontal } from "react-icons/fi";

// Replace with your Public API Key
builder.init((process.env.NEXT_PUBLIC_BUILDER_API_KEY!));

type BuilderPageProps = ComponentProps<typeof BuilderComponent>;

export default async function BlogArticle(props: BuilderPageProps) {
    const model = "blog-article";
    const content = await builder
        .get("blog-article", {
            prerender: false,
            // Include references, like the `author` ref
            options: { includeRefs: true },
            query: {
                // Get the specific article by handle
                "data.handle": props.location?.pathname,
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
                className="text-white bg-[#15212d] w-3/4 py-10 px-20 mx-auto border border-transparent border-t-2 border-t-teal-300">
            </div>
            <div className="text-center mt-10 text-gray-400 mb-20">
                <a href={`/blog`}>Back to Overview<FiMoreHorizontal className="mx-auto" /></a>
            </div>
        </div>
    );
}