import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn, sortPosts, filterProjectHeadings } from "@/lib/utils";
import { posts } from "#site/content";
import Link from "next/link";
import { PostItem } from "@/components/post-item";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const headingPosts = filterProjectHeadings(posts);

  const latestPosts = sortPosts(posts).slice(0, 5);
  return (
    <>
      <section className="space-y-3 pb-8 pt-6 md:pb-6 md:mt-6 lg:py-32">
        <div className="container flex flex-col gap-4 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance leading-tight" style={{ lineHeight: "1.3" }}>
            Your Ultimate Resource Hub
            <br style={{ marginBottom: "1.5em" }} />
            for Software Engineering
          </h1>
          <p className="max-w-[60rem] mx-auto text-muted-foreground sm:text-xl text-balance mt-6">
          Discover a curated collection of top-tier resources, tools, and guides to supercharge your
          software engineering journey, from low level designs to heigh level designs.
          </p>
          <div className="flex flex-col gap-4 justify-center sm:flex-row mt-6">
            <Link
              href="/blog"
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit")}
            >
              Resources
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full sm:w-fit"
              )}
            >
              Contribute
            </Link>
          </div>
        </div>
      </section>
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
                      <CardTitle className="leading-1">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{post.description?.slice(0, 70)} ...</p>
                    </CardContent>
                    <CardFooter>
                      <span
                        className={cn(
                          "inline-block rounded-full px-3 py-1 text-xs font-semibold",
                          post.category === "Cloud"
                            ? "bg-gradient-to-r from-purple-400 to-pink-500 text-white"
                            : post.category === "Low Level Design"
                            ? "bg-gradient-to-r from-blue-400 to-cyan-500 text-white"
                            : post.category === "System Design"
                            ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
                            : post.category === "Other"
                            ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                            : "bg-gray-200 text-gray-800"
                        )}
                      >
                        {post.category}
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              )
          )}
        </ul>
      </section>
      {/* <section className="container max-w-4xl py-6 lg:py-6 flex flex-col space-y-6 mt-40">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">
          Latest Posts
        </h2>
        <ul className="flex flex-col">
          {latestPosts.map(
            (post) =>
              post.published && (
                <li
                  key={post.slug}
                  className="first:border-t first:border-border"
                >
                  <PostItem
                    slug={post.slug}
                    title={post.title}
                    description={post.description}
                    date={post.date}
                  />
                </li>
              )
          )}
        </ul>
      </section> */}
    </>
  );
}
