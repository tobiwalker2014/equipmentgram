"use client";

import { useCreateBlog } from "@/lib/network/blog";
import { Button, Input, TextInput } from "@mantine/core";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";

type Props = {};

const CreateBlog = ({}: Props) => {
  const editor = useRef(null);
  const [content, setContent] = useState<any>("");
  const [title, setTitle] = useState("");

  const mutation = useCreateBlog();

  const onCreateNewBlog = async () => {
    await mutation.mutateAsync({
      category: {
        id: "1",
        name: "test",
      },
      content: content,
      created_at: new Date().toISOString(),
      id: "1",
      title: title,
      updated_at: new Date().toISOString(),
    });
  };

  return (
    <div className="max-w-screen-lg space-y-4">
      <TextInput onChange={(e) => setTitle(e.currentTarget.value)} label="Title" placeholder="Title" />
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
