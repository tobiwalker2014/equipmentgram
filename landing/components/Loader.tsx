import { Container, Loader } from "@mantine/core";
import React from "react";

type Props = {};

function CustomLoader({}: Props) {
  return (
    <Container className="min-h-[70vh] flex items-center justify-center">
      <Loader size={70} type="dots" />
    </Container>
  );
}

export default CustomLoader;
