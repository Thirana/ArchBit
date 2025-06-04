"use client";

import { useState } from "react";

interface CategoryFilterProps {
  categories: string[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (category: string) => {
    setSelected(category === selected ? null : category);
    console.log(`Filtering for category: ${category}`);
    // Optionally: trigger URL update or client-side filtering
  };

  return (
    <ul className="space-y-3">
      {categories.map((category) => (
        <li key={category}>
          <button
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-150 ${
              selected === category
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
