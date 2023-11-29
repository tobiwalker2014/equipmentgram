import React from "react";

type Props = {};

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EquipmentGram - Blog",
};

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default BlogLayout;
