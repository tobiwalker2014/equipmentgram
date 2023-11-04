import CreateBlog from "@/components/admin/create-blog";
import CreateCategory from "@/components/sections/blog/create-category";
import React from "react";

type Props = {};

const AdminTools = (props: Props) => {
  return (
    <div>
      <CreateBlog />
      {/* <CreateCategory /> */}
    </div>
  );
};

export default AdminTools;
