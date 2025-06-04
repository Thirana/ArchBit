"use client"

import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { QueryPagination } from "@/components/query-pagination";
import { sortPosts, filterProjectHeadings } from "@/lib/utils";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


const POSTS_PER_PAGE = 5;

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const sortedPosts = sortPosts(posts.filter((post) => post.published));
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  );

  const headingPosts = filterProjectHeadings(posts);

  return (
  

    <div className="flex flex-col md:flex-row gap-8 bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-lg p-6 md:p-10">
      {/* Sidebar for categories */}
      <aside className="md:w-1/4 w-full mb-6 md:mb-0 md:mr-8">
        <div className="sticky top-8 bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-bold mb-6 text-gray-800 tracking-tight flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
            Categories
          </h2>
          <ul className="space-y-3">
            {Array.from(new Set(posts.map(post => post.category))).map(category => (
              <li key={category}>
                <button
                  className="w-full text-left px-4 py-2 rounded-lg transition-colors duration-150 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onClick={() => { /* filter logic TBD */ }}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main content for posts */}
      <main className="md:w-3/4 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
        {posts.map((post) =>
          post.published && (
            <Link href={post.slug} key={post.slug} className="group">
              <Card className="flex flex-col justify-between h-full rounded-xl shadow-md border border-gray-200 bg-white transition-transform duration-200 group-hover:-translate-y-1 group-hover:shadow-xl">
                <CardHeader className="gap-2 pb-0">
                  <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    {post.category}
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-4">
                  <p className="text-gray-700">{post.description?.slice(0, 90)}...</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t pt-3">
                  <span className="text-xs text-gray-400">{post.date}</span>
                  <span className="inline-flex items-center gap-1 text-blue-600 text-xs font-medium group-hover:underline">
                    Read more
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
                  </span>
                </CardFooter>
              </Card>
            </Link>
          )
        )}
      </main>
    </div>
      
  );
}
