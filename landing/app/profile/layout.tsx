import React from "react";
import type { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  title: "EquipmentGram - Profile",
};

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ProfileLayout;
