"use client";

import CustomLoader from "@/components/CustomLoader";
import QuestionFormPDF from "@/components/QuestionFormPDF";
import { useGetInspectionFormById } from "@/lib/network/forms";
import { Text } from "@mantine/core";
import { PDFViewer } from "@react-pdf/renderer";
import React, { Fragment } from "react";

const SavedForm: React.FC<{
  params: any;
  searchParams: any;
}> = ({ params, searchParams }) => {
  // Destructure the data object to access its properties
  const { data } = useGetInspectionFormById(params.id);

  if (!data || typeof data === "undefined") return <CustomLoader />;
  console.log(data);

  return (
    <div className="max-w-[600px] mx-auto pb-10 pt-4">
      {/* <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <QuestionFormPDF inspectionForm={data} />
      </PDFViewer> */}
      <div className="border border-solid divide-y ">
        <Item value={data.createdByUser?.display_name} label="Name of Inspector" />

        <Item value={data.form?.nameOfBusiness} label="Business Name" />

        <Item value={data.form?.dateOfInspection?.toDate().toLocaleDateString()} label="Date of Inspection" />

        <Item value={data.form?.timeOfInspection} label="Time of Inspection" />

        <Item value={data.form?.customerEmail} label="Customer Email" />

        <Item
          value={
            <div>
              <Text size="xl">{data.form?.address?.line1}</Text>
              <Text size="xl">{data.form?.address?.line2}</Text>
              <Text size="xl">
                {data.form?.address?.city}, {data.form?.address?.state} {data.form?.address?.zip}
              </Text>
            </div>
          }
          label="Address"
        />

        {data.form?.pages.map((page, index) => (
          <div key={index}>
            <div className="text-center px-2 py-4">
              <Text size="xl" className="font-bold ">
                {page.name}
              </Text>
              {page?.comment && <Text>{page.comment}</Text>}
            </div>
            <ul>
              {page.questions.map((question, index) => (
                <Fragment key={index}>
                  {question.value && <Item value={question.value} label={question.label} />}
                  {question.comment && <Item value={question.comment} label={question.value!} />}
                  {question.imageUrl && <ImageItem src={question.imageUrl} label="Post Image" />}
                </Fragment>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedForm;

function Item({ value, label }: { value: any; label: string }) {
  return (
    <div>
      <Text size="lg" className="px-2 bg-blue-100">
        <strong>{label}:</strong>
      </Text>

      {/* check if value is a children  */}
      {typeof value === "object" ? (
        <div className="pl-6 pr-4 py-2">{value}</div>
      ) : (
        <Text size="xl" className="pl-6 pr-4 py-2">
          {value}
        </Text>
      )}
    </div>
  );
}

function ImageItem({ src, label }: { src: any; label: string }) {
  return (
    <div>
      <Text size="lg" className="px-2 bg-blue-100">
        <strong>{label}:</strong>
      </Text>
      <img className="p-2" src={src} />
    </div>
  );
}
