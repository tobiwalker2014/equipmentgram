"use client";

import EquipmentItem from "@/components/EquipmentItem";
import { equipments } from "@/utils/equipment";
import { Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const FormsSentPage = (props: Props) => {
  const navigation = useRouter();
  const items = equipments.map((item, i) => (
    <EquipmentItem key={i} item={item} onClick={() => navigation.push("/forms-sent".concat(item.link))} />
  ));

  return (
    <div>
      <Text className="mb-4 text-2xl font-bold">Sent Forms</Text>
      <div className="space-y-2">{items}</div>
    </div>
  );
};

export default FormsSentPage;
