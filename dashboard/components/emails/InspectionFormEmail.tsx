import { InspectionFormWithId } from "@/lib/network/forms";
import { Body, Container, Head, Html, Img, Section, Text } from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import {} from "../../utils/equipment";

export interface InspectionFormEmailProps extends InspectionFormWithId {
  sendTo: string;
  sentFrom: string;
}

export default function InspectionFormEmail({
  form,
  createdByUserUid,
  id,
  type,
  createdByUser,
  sentFrom,
}: InspectionFormEmailProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Text className="text-[18px] font-normal p-0 my-[30px] mx-0">
              {sentFrom} has sent you a new inspection report for {form?.nameOfBusiness} . Please review the report and
              take any necessary action.
            </Text>

            <Section className="border border-solid divide-y">
              <Item value={createdByUser?.display_name} label="Name of Inspector" />
              <Item value={form?.nameOfBusiness} label="Name of Business Where Inspection Took Place:" />

              <Item
                value={
                  <Section className="pl-6">
                    <Text className="m-0">{form?.address?.line1}</Text>
                    <Text className="m-0">{form?.address?.line2}</Text>
                    <Text className="m-0">
                      {form?.address?.city}, {form?.address?.state} {form?.address?.zip}
                    </Text>
                  </Section>
                }
                label="Address"
              />

              <Item value={form?.customerEmail} label="Customers Email Address" />
              <Item value={"form?.dateOfInspection"} label="Date of Inspection" />
              <Item value={form?.timeOfInspection} label="Time at Which Inspection Took Place:" />

              {form?.pages.map((page, index) => (
                <Section key={index}>
                  <Section className="text-center p-2">
                    <Text className="font-bold text-xl">{page.name}</Text>
                    {page?.comment && <Text>{page.comment}</Text>}
                  </Section>
                  <Section>
                    {page.questions.map((question, index) => (
                      <Section key={index}>
                        {question.value && <Item value={question.value} label={question.label} />}
                        {question.comment && <Item value={question.comment} label={question.value!} />}
                        {question.imageUrl && <ImageItem src={question.imageUrl} label="Post Image" />}
                      </Section>
                    ))}
                  </Section>
                </Section>
              ))}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

function Item({ value, label }: { value: any; label: string }) {
  return (
    <Section>
      <Text className="px-2 font-bold m-0 bg-blue-100">{label}:</Text>
      <Text className="pl-6 m-0 pr-4">{value}</Text>
    </Section>
  );
}

function ImageItem({ src, label }: { src: any; label: string }) {
  return (
    <Section className="">
      <Text className="font-bold px-2 m-0 bg-blue-100">{label}:</Text>
      <Section className="p-2">
        <Img className="max-w-full h-auto" src={src} />
      </Section>
    </Section>
  );
}
