import { Center, Loader } from "@mantine/core";
import React from "react";

type Props = {};

function CustomLoader({}: Props) {
  return (
    <Center h="100%" w="100%">
      <Loader size={50} type="bars" />
    </Center>
  );
}

export default CustomLoader;
