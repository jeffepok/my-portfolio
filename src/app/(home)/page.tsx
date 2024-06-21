import React from "react";
import { builder } from "@builder.io/sdk";

builder.init((process.env.NEXT_PUBLIC_BUILDER_API_KEY!));

import { FiMoreHorizontal } from "react-icons/fi";
import Link from "next/link";
import { getPrettyDate } from "../lib/utils";

interface ArticleHighlightProps {
  title: string
  blurb: string
  handle: string
  date: Date
  image?: string
}
interface HomeProps {
  article: ArticleHighlightProps
}
async function getData() {
  let articles = await builder.getAll("blog-article", {
    // Include references, like the `author` ref
    enrich: true,
    limit: 10,
  });
  articles = articles.sort((a, b) => a.data!.date > b.data!.date ? -1 : 1)
  let article = articles[0]
  const newArticle = {
    title: article.data!.title,
    blurb: article.data!.blurb,
    handle: article.data!.handle,
    date: article.data!.date,
    image: article.data!.image
  }
  return newArticle
}

const Home = async () => {
  const article = await getData()
  return <main className="text-white min-h-screen mx-auto container px-10">
    <div className="lg:flex items-end">
      <div>
        <div className="text-4xl text-left">
          <p className="">Hi,</p>
          <p className="pt-3">I am Jefferson Tuffour</p>
          <p className="pt-3">Full-Stack Developer</p>
          <p className="text-sm pt-7">
            I have 5 years of professional experience, an expert in building robust and scalable mobile and web applications in Python, Django, React, Node.js, and Flutter.
          </p>
          <p className="text-sm pt-7 text-gray-400">
            I&apos;m working at Overloop LTD., where I offer software engineering services to it&apos;s clients in the U.S.
          </p>

        </div>
        <div className="text-center mt-10 text-gray-400 hover:text-white">
          <a href="/about">View more<FiMoreHorizontal className="mx-auto" /></a>

        </div>
      </div>
      <div>
        <div className="relative">
          <div className="text-4xl text-left">
            <p className="">Blog</p>
          </div>
          <div className="text-center mt-10 text-gray-400 hover:text-white">
            <Link href={"/blog/" + article.handle}><img src={article.image}/></Link>
            <div className="absolute bottom-0 text-left py-5 bg-black w-fit px-5">
                <p className=" text-sm">
                  {article.title}
                </p>
                <p className="text-sm text-gray-400">
                  {getPrettyDate(new Date(article.date))}
                </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-10 text-gray-400 hover:text-white">
          <a href={`/blog/${article.handle}`}>View more<FiMoreHorizontal className="mx-auto" /></a>
        </div>
      </div>
    </div>
  </main>;
};


export default Home;
