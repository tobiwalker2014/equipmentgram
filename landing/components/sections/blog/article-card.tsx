import { IBlog } from "@/lib/network/blog";
import { Badge, Card, Image, Text } from "@mantine/core";

export function ArticleCard({ category, content, created_at, id, title, updated_at, imageUrl }: IBlog) {
  return (
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

      <Text>{title || "No title"}</Text>

      <Badge fw={700} mt="xs" w="fit-content" variant="light">
        {category.name}
      </Badge>
    </Card>
  );
}
