"use client";

import { ArticleCard } from "@/components/sections/blog/article-card";
import { useBlogByCategory } from "@/lib/network/blog";

export default async function PostRoute({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const data = useBlogByCategory(slug);

  if (data?.data?.length === 0) return <h2>no post found</h2>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {data?.data?.map((article) => {
        return <ArticleCard {...article} />;
      })}
    </div>
  );
}
