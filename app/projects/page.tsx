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
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:mt-10 lg:py-16">
        <div className="container max-w-4xl flex flex-col gap-4 text-left">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black pb-4">
            My Projects
          </h1>
          <p className="max-w-[42rem]  text-muted-foreground sm:text-xl ">
            Welcome to my blog template. Built using tailwind, shadcn, velite
            and Nextjs 14.
          </p>
          <hr className="w-full border-t-2 border-gray-300 mt-4" />
        </div>
      </section>
      <section className="container max-w-4xl py-6 lg:py-6 flex flex-col space-y-6 ">
        <ul className="grid grid-cols-2 gap-8">
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
    </>
  );
}
