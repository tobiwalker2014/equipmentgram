import React from "react";
import { Title, Text, Button, Container } from "@mantine/core";

type Props = {};

const WhatWeDo = (props: Props) => {
  return (
    <div className="md:my-40 my-10 grid md:grid-cols-2 grid-cols-1 md:gap-20 gap-10">
      <div className=" space-y-6">
        <Title className="text-blue-700">What We Do</Title>

        <Text size="lg" c="dimmed" className="">
          EquipmentGram is your trusted partner when it comes to evaluating the condition and history of construction
          equipment. We work with a network of dedicated inspectors who meticulously assess heavy machinery and provide
          detailed inspection reports. These reports help you make informed decisions, whether you're looking to buy,
          sell, or maintain your equipment.
        </Text>
      </div>
      <div className=" space-y-6">
        <Title className="text-blue-700">Our Mission</Title>

        <Text size="lg" c="dimmed" className="">
          EquipmentGram is here to bridge the gap between the world of construction equipment inspections and
          technology. Our mission is to simplify the equipment inspection process, save customers time and money, and to
          ensure that customers get the most out of their investments.
        </Text>
      </div>
    </div>
  );
};

export default WhatWeDo;
