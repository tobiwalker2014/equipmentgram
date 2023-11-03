"use client";

import Post from "@/components/sections/blog/post";
import { useBlogById } from "@/lib/network/blog";

export default function PostRoute({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const { data } = useBlogById(slug);

  if (!data) return <h2>no post found</h2>;

  return (
    <div className="grid grid-cols-1 my-10  mx-auto max-w-screen-md container px-4">
      <Post data={data} />
    </div>
  );
}
