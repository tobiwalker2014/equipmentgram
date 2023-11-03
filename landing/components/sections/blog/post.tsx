import { IBlog } from "@/lib/network/blog";
import { Image } from "@mantine/core";

export default function Post({ data }: { data: IBlog }) {
  const { title, category, content, created_at, id, updated_at, imageUrl } = data;

  return (
    <article className="min-w-full">
      <Image
        src={
          imageUrl ||
          "https://images.unsplash.com/photo-1629840963351-f5e2e6578f38?auto=format&fit=crop&q=80&w=1932&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="article cover image"
        width={400}
        height={400}
        className="w-full h-96 object-cover rounded-lg"
      />
      <div className="space-y-6">
        <h1 className="leading-tight text-5xl font-bold ">{title}</h1>
        <div className="">
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

      <div className="">
        <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        ></div>
      </div>
    </article>
  );
}
