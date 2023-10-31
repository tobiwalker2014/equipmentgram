import { InspectionFormWithId } from "@/lib/network/forms";
import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

type Props = {
  inspectionForm: InspectionFormWithId;
};

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 14,
  },
  section: {
    // paddingHorizontal: 10,
  },
  label: {
    paddingHorizontal: 10,
    backgroundColor: "#dbeafe",
    fontWeight: "black",
  },
  pageInfoContainer: {
    padding: 10,
    textAlign: "center",
    fontWeight: "black",
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  value: {
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 5,
  },
  image: {
    width: "100%",
    height: "auto",
    padding: 10,
  },
});

const QuestionFormPDF = ({ inspectionForm }: Props) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Item value={inspectionForm.createdByUser?.display_name} label="Name of Inspector" />
          <Item value={inspectionForm.form?.nameOfBusiness} label="Name of Business Where Inspection Took Place:" />

          <Item
            value={
              <View>
                <View>
                  <Text>{inspectionForm.form?.address?.line1}</Text>
                </View>
                <View>
                  <Text>{inspectionForm.form?.address?.line2}</Text>
                </View>
                <View>
                  <Text>
                    {inspectionForm.form?.address?.city}, {inspectionForm.form?.address?.state}{" "}
                    {inspectionForm.form?.address?.zip}
                  </Text>
                </View>
              </View>
            }
            label="Address of Inspection Location:"
          />
          <Item value={inspectionForm.form?.customerEmail} label="Customers Email Address" />
          <Item
            value={inspectionForm.form?.dateOfInspection?.toDate().toLocaleDateString()}
            label="Date of Inspection"
          />
          <Item value={inspectionForm.form?.timeOfInspection} label="Time at Which Inspection Took Place:" />

          {inspectionForm.form?.pages.map((page, index) => (
            <View key={index}>
              <View style={styles.pageInfoContainer}>
                <Text style={styles.pageTitle}>{page.name}</Text>
                {page?.comment && <Text>{page.comment}</Text>}
              </View>

              {page.questions.map((question, index) => (
                <View key={index}>
                  {question.value && <Item value={question.value} label={question.label} />}
                  {question.comment && <Item value={question.comment} label={question.value!} />}
                  {question.imageUrl && <ImageItem src={question.imageUrl} label="Post Image" />}
                </View>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default QuestionFormPDF;

function Item({ value, label }: { value: any; label: string }) {
  return (
    <View>
      <View style={styles.label}>
        <Text>{label}:</Text>
      </View>
      <View style={styles.value}>
        <Text>{value}</Text>
      </View>
    </View>
  );
}

function ImageItem({ src, label }: { src: any; label: string }) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Image src={src} style={styles.image} />
    </View>
  );
}
