import { ThemeIcon, Text, Title, Container, SimpleGrid, rem } from "@mantine/core";
import { IconGauge, IconCookie, IconUser, IconMessage2, IconLock } from "@tabler/icons-react";
import Link from "next/link";

export const MOCKDATA = [
  {
    icon: IconGauge,
    title: "Transparency",
    description:
      "Empowers buyers with information and trust to make informed and confident purchasing decisions possible",
  },
  {
    icon: IconGauge,
    title: "Quality Assurance",
    description:
      "Ensures that the equipment being bought and sold is in good condition, as it directly impacts the buyers/sellers' experience and long-term satisfaction",
  },
  {
    icon: IconGauge,
    title: "Risk Mitigation",
    description:
      "Reduced risk means buyers/sellers are less likely to face unexpected expenses or downtime due to equipment issues",
  },
  {
    icon: IconGauge,
    title: "Insurance Benefits",
    description: "Some insurance companies may offer better rates for equipment with documented inspection reports",
  },
  {
    icon: IconGauge,
    title: "Standardization",
    description:
      "Providing standardized inspection reports simplifies the buying/selling process and enhances the efficiency of the marketplace",
  },
  {
    icon: IconGauge,
    title: "Credibility",
    description:
      "The involvement of professional inspectors instills confidence in the accuracy of the inspection reports, making the service more trustworthy",
  },
  {
    icon: IconGauge,
    title: "Peace of Mind",
    description:
      "Offering buyers/sellers peace of mind is a valuable benefit, as it reduces stress and anxiety associated with significant purchases",
  },
  {
    icon: IconGauge,
    title: "Market Efficiency",
    description:
      "Streamlining the buying and selling process in the construction equipment market benefits all parties involved and enhances overall market efficiency",
  },
  {
    icon: IconGauge,
    title: "Improved Resale Value",
    description: "For sellers, having an EquipmentGram inspection report can help justify a higher resale price",
  },
  {
    icon: IconGauge,
    title: "Reduced Fraud",
    description: "Helps reduce the likelihood of fraud and misrepresentation of equipment condition",
  },
  {
    icon: IconGauge,
    title: "Regulatory Compliance",
    description: "Ensures that equipment meets all necessary regulatory and safety standards",
  },
  {
    icon: IconGauge,
    title: "Long-Term Reliability",
    description:
      "Buyers can expect better long-term reliability and durability from equipment with documented inspections",
  },
];

interface FeatureProps {
  icon: React.FC<any>;
  title: React.ReactNode;
  description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div>
      {/* <ThemeIcon variant="light" size={40} radius={40}>
        <Icon style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      </ThemeIcon> */}
      <Text mt="sm" mb={7} className="font-bold">
        {title}
      </Text>
      <Text size="sm" c="dimmed" lh={1.6}>
        {description}
      </Text>
    </div>
  );
}

export function FeaturesGrid() {
  const features = MOCKDATA.map((feature, index) => <Feature {...feature} key={index} />);

  return (
    <div className="">
      <Title className="text-center">EquipmentGram’s Benefits</Title>

      <Container size={560} p={0}>
        <Text size="sm" className="text-center">
          Below are some benefits that come with using EquipmentGram reports
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        cols={{ base: 1, sm: 2, md: 4 }}
        spacing={{ base: "xl", md: 50 }}
        verticalSpacing={{ base: "xl", md: 50 }}
      >
        {features}
      </SimpleGrid>

      <div className="mt-20">
        <p className="text-xl mb-2">
          Join us on this journey to bring transparency, trust, and reliability to the construction equipment
          marketplace.
        </p>
        <Link href="/contact-us" className="font-bold text-blue-700">
          Ready to get started? Contact us today!
        </Link>
      </div>
    </div>
  );
}
