import React from "react";

type Props = {};

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EquipmentGram - Contact Us",
};
const ContactUsLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ContactUsLayout;
