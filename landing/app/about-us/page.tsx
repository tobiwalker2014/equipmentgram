import { Feature, FeaturesGrid } from "@/components/sections/about-us/feature";
import WhatWeDo from "@/components/sections/about-us/what-we-do";
import React from "react";

type Props = {};

const AboutUs = (props: Props) => {
  return (
    <div className="container max-w-screen-xl  mx-auto px-4 my-20">
      <WhatWeDo />
      <FeaturesGrid />
    </div>
  );
};

export default AboutUs;
