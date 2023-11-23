"use client";

import { useCreateCategory } from "@/lib/network/blog";
import { Button, TextInput } from "@mantine/core";
import React, { useState } from "react";

type Props = {};

const CreateCategory = (props: Props) => {
  const mutate = useCreateCategory();
  const [name, setName] = useState("");

  return (
    <div>
      <h1 className="mb-4 font-bold">Create Category</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await mutate.mutateAsync(name);
          setName("");
        }}
        className="space-y-4"
      >
        <TextInput
          label="Category Name"
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
        />
        <Button loading={mutate.isLoading} type="submit">
          Create New Category
        </Button>
      </form>
    </div>
  );
};

export default CreateCategory;
