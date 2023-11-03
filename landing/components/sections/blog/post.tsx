import { IBlog } from "@/lib/network/blog";
import Image from "next/image";

export default function Post({ data }: { data: IBlog }) {
  const { title, category, content, created_at, id, updated_at, imageUrl } = data;

  return (
    <article className="space-y-8 dark:bg-black dark:text-gray-50">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="article cover image"
          width={400}
          height={400}
          className="w-full h-96 object-cover rounded-lg"
        />
      )}
      <div className="space-y-6">
        <h1 className="leading-tight text-5xl font-bold ">{title}</h1>
        <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-400">
          <div className="flex items-center md:space-x-2">
            {/* {authorImgUrl && (
              <Image
                src={authorImgUrl}
                alt="article cover image"
                width={400}
                height={400}
                className="w-14 h-14 border rounded-full dark:bg-gray-500 dark:border-gray-700"
              />
            )} */}
            {/* <p className="text-md dark:text-violet-400">
              {author && author.name} • {formatDate(publishedAt)}
            </p> */}
          </div>
        </div>
      </div>

      <div className="dark:text-gray-100">
        <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        ></div>
      </div>
    </article>
  );
}
