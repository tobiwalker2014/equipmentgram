"use client";

import { ArticleCard } from "@/components/sections/blog/article-card";
import { useBlogs } from "@/lib/network/blog";

type Props = {};

const BlogPage = (props: Props) => {
  const { data } = useBlogs();

  if (data?.length === 0) return <h2>no post found</h2>;

  console.log(data);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 max-w-screen-xl mx-auto container px-4 my-20">
      {data?.map((article) => {
        return <ArticleCard {...article} />;
      })}
    </div>
  );
};

export default BlogPage;
