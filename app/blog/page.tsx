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
    // <div className="container max-w-4xl py-6 lg:py-10">
    //   <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
    //     <div className="flex-1 space-y-4">
    //       <h1 className="inline-block font-black text-4xl lg:text-5xl">Blog</h1>
    //       <p className="text-xl text-muted-foreground">
    //         My ramblings on all things web dev.
    //       </p>
    //     </div>
    //   </div>
    //   <div className="grid grid-cols-12 gap-3 mt-8">
    //     <div className="col-span-12 col-start-1 sm:col-span-8">
    //       <hr />
    //       {displayPosts?.length > 0 ? (
    //         <ul className="flex flex-col">
    //           {displayPosts.map((post) => {
    //             const { slug, date, title, description } = post;
    //             return (
    //               <li key={slug}>
    //                 <PostItem
    //                   slug={slug}
    //                   date={date}
    //                   title={title}
    //                   description={description}
    //                 />
    //               </li>
    //             );
    //           })}
    //         </ul>
    //       ) : (
    //         <p>Nothing to see here yet</p>
    //       )}
    //       <QueryPagination
    //         totalPages={totalPages}
    //         className="justify-end mt-4"
    //       />
    //     </div>
    //   </div>
    // </div>

    <section className="container max-w-8xl py-6 lg:py-6 flex flex-col space-y-6 mt-20">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center mb-6">
          Popular Reousrces
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {headingPosts.map(
            (post) =>
              post.published && (
                <Link href={post.slug} key={post.slug}>
                  <Card className="flex flex-col justify-between">
                    <CardHeader className="gap-2">
                      <CardTitle>{post.title}</CardTitle>
                      <CardDescription>This is description</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{post.description?.slice(0, 70)} ...</p>
                    </CardContent>
                    <CardFooter>
                      <p>Card Footer</p>
                    </CardFooter>
                  </Card>
                </Link>
              )
          )}
        </ul>
      </section>
  );
}
