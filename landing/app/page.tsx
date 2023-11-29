import Header from "@/components/sections/header";
import { Metadata } from "next";
import Image from "next/image";

type Props = {};

export const metadata: Metadata = {
  title: "EquipmentGram",
};

export default function Home() {
  return (
    <main>
      <Header />
    </main>
  );
}
