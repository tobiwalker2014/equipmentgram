"use client";

import { useCategories, useCreateBlog } from "@/lib/network/blog";
import { Autocomplete, Button, Input, TextInput } from "@mantine/core";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import UploadFileField from "../forms/upload-file-field";

type Props = {};

const CreateBlog = ({}: Props) => {
  const editor = useRef(null);
  const [content, setContent] = useState<any>("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const mutation = useCreateBlog();

  const onCreateNewBlog = async () => {
    await mutation.mutateAsync({
      category: {
        name: category,
      },
      content: content,
      created_at: new Date().toISOString(),

      title: title,
      updated_at: new Date().toISOString(),
    });
  };

  const { data: categories } = useCategories();

  return (
    <div className="max-w-screen-lg space-y-4">
      <TextInput onChange={(e) => setTitle(e.currentTarget.value)} label="Title" placeholder="Title" />
      <UploadFileField fileName={title} onUploadComplete={(url) => console.log(url)} />
      <Autocomplete
        label="Category"
        placeholder="Pick value or enter anything"
        data={categories?.map((category) => category.name)}
        onChange={(value) => setCategory(value)}
      />

      <div>
        <label className="text-md font-medium">Content</label>
        <JoditEditor
          ref={editor}
          value={content}
          config={{
            readonly: false, // all options from https://xdsoft.net/jodit/doc/
          }}
          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => {
            console.log(newContent);
          }}
        />
      </div>

      <Button onClick={onCreateNewBlog}>Submit</Button>
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      ></div>
    </div>
  );
};

export default CreateBlog;
