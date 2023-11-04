"use client";

import CreateBlog from "@/components/admin/create-blog";
import CreateCategory from "@/components/sections/blog/create-category";
import { Tabs } from "@mantine/core";
import React from "react";

type Props = {};

const AdminTools = (props: Props) => {
  return (
    <Tabs defaultValue="blog" orientation="vertical">
      <Tabs.List miw={200}>
        <Tabs.Tab value="blog">Create Blog</Tabs.Tab>
        <Tabs.Tab value="category">Create Category</Tabs.Tab>
      </Tabs.List>

      <div className="px-10 w-full">
        <Tabs.Panel value="blog">
          <CreateBlog />
        </Tabs.Panel>
        <Tabs.Panel value="category">
          <CreateCategory />
        </Tabs.Panel>
      </div>
    </Tabs>
    // <div className="grid grid-cols-4 ">
    //   <div>
    //     <div>Create Category</div>
    //     <div>Create Blog</div>
    //   </div>
    //   <div className="col-span-3">
    //     <CreateBlog />
    //   </div>
    // </div>
  );
};

export default AdminTools;
