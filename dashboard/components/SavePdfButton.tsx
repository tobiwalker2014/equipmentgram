import { InspectionFormWithId } from "@/lib/network/forms";
import { Button } from "@mantine/core";
import { PDFDownloadLink, usePDF } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import QuestionFormPDF from "./QuestionFormPDF";

type Props = {
  inspectionForm: InspectionFormWithId;
};

function SavePdfButton({ inspectionForm }: Props) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  return (
    <div>
      {isButtonClicked ? (
        <PDFDownloadLink
          document={<QuestionFormPDF inspectionForm={inspectionForm} />}
          fileName={`${inspectionForm.id}.pdf`}
        >
          {({ blob, url, loading, error }) => (
            <Button loading={loading} size="md">
              Download PDF
            </Button>
          )}
        </PDFDownloadLink>
      ) : (
        <Button size="md" onClick={() => setIsButtonClicked(true)}>
          Generate PDF
        </Button>
      )}
    </div>
  );
}
export default SavePdfButton;
