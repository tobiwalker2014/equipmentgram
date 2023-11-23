"use client";

import CustomLoader from "@/components/Loader";
import NoBlogFound from "@/components/NoBlogFound";
import { ArticleCard } from "@/components/sections/blog/article-card";
import { useBlogs } from "@/lib/network/blog";

type Props = {};

const BlogPage = (props: Props) => {
  const { data, isLoading } = useBlogs();

  if (isLoading) return <CustomLoader />;

  if (data?.length === 0) return <NoBlogFound />;

  console.log(data);

  return (
    <div className="my-10">
      {/* <div className="text-center font-bold text-4xl">Blog</div> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-screen-xl mx-auto container px-4 my-20">
        {data?.map((article) => {
          return <ArticleCard {...article} />;
        })}
      </div>
    </div>
  );
};

export default BlogPage;
