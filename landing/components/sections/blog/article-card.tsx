import { IBlog, IBlogWithId } from "@/lib/network/blog";
import { Badge, Card, Image, Text } from "@mantine/core";
import Link from "next/link";

export function ArticleCard({ category, content, created_at, id, title, updated_at, imageUrl }: IBlogWithId) {
  return (
    <Link href={`/blog/${category.name}/${id}`}>
      <Card withBorder padding="lg" radius="md">
        <Card.Section mb="sm">
          <Image
            src={
              imageUrl ||
              // random image
              "https://images.unsplash.com/photo-1629840963351-f5e2e6578f38?auto=format&fit=crop&q=80&w=1932&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={title}
            height={180}
          />
        </Card.Section>

        <Text className="font-bold">{title || "No title"}</Text>

        <Link href={`/blog/${category.name}`}>
          <Badge className="hover:bg-blue-600" radius={0} mt="xs" w="fit-content">
            {category.name}
          </Badge>
        </Link>
      </Card>
    </Link>
  );
}
