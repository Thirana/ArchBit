"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface CategoryFilterProps {
  categories: string[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category");

  const handleClick = (category: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (category === selectedCategory) {
      current.delete("category"); // remove filter if already selected
    } else {
      current.set("category", category);
    }
    router.push(`?${current.toString()}`);
  };

  return (
    <ul className="space-y-3">
      {categories.map((category) => (
        <li key={category}>
          <button
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-150 ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-blue-50 hover:bg-blue-100 text-blue-700"
            } font-medium focus:outline-none focus:ring-2 focus:ring-blue-400`}
            onClick={() => handleClick(category)}
          >
            {category}
          </button>
        </li>
      ))}
    </ul>
  );
}
