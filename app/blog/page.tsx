import { posts } from "#site/content";
import Link from "next/link";
import { CategoryFilter } from "@/components/category-filter";
import { sortPosts } from "@/lib/utils";
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
    category?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const selectedCategory = searchParams?.category;

  // Step 1: Only include published posts
  let filteredPosts = posts.filter((post) => post.published);

  // Step 2: Apply category filter if selected
  if (selectedCategory) {
    filteredPosts = filteredPosts.filter(
      (post) => post.category === selectedCategory
    );
  }

  // Step 3: Sort and paginate
  const sortedPosts = sortPosts(filteredPosts);
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  );

  // Extract all unique categories
  const allCategories = Array.from(new Set(posts.map((post) => post.category)))
  .sort((a, b) => {
    if (a === "Other") return 1; // Push "Other" down
    if (b === "Other") return -1;
    return a.localeCompare(b); // Alphabetical order
  });
  

  return (
    <div className="mx-auto w-full max-w-8xl 2xl:max-w-[1600px] 3xl:max-w-[1920px]">
      <div className="flex flex-col md:flex-row gap-8 bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl p-6 md:p-10">
        {/* Sidebar for categories */}
        <aside className="md:w-1/4 w-full mb-6 md:mb-0 md:mr-8">
          <div className="sticky top-8 bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-bold mb-6 text-gray-800 tracking-tight flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Categories
            </h2>
            <CategoryFilter categories={allCategories} />
          </div>
        </aside>

        {/* Main content for posts */}
        <main className="md:w-3/4 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Blog Page Heading */}
          <section className="col-span-full mb-8">
            <div className="mb-3">
              <span className="inline-block w-12 h-1 rounded bg-blue-500"></span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight text-left">
              Welcome to the ArchBit Resource Hub
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl text-left">
              Discover the latest insights, tutorials, and stories from our team. Stay updated and inspired.
            </p>
          </section>

          {displayPosts.map((post) => (
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
                  <p className="text-gray-700">
                    {post.description?.slice(0, 90)}...
                  </p>
                </CardContent>
                <CardFooter className="flex items-center justify-between pt-3">
                  <span className="inline-flex items-center gap-1 text-blue-600 text-xs font-medium group-hover:underline">
                    View
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </main>
      </div>
    </div>
  );
}
