"use client";

import CustomLoader from "@/components/CustomLoader";
import { useAuth } from "@/lib/authContext";
import { useGetSentReports } from "@/lib/network/sent-reports";
import { Avatar, Button, Table } from "@mantine/core";
import { useRouter } from "next/navigation";

interface ViewSavedFormListByTypePageProps {
  params: any;
  searchParams: any;
}

function ViewSavedFormListByTypePage({ params, searchParams }: ViewSavedFormListByTypePageProps) {
  const { user } = useAuth();
  const { data, isLoading } = useGetSentReports(params.equipmentType);
  const navigation = useRouter();

  if (isLoading) {
    return <CustomLoader />;
  }

  return (
    <div>
      {data && data?.length > 0 ? (
        <div>
          <Table
            styles={{
              table: {
                fontSize: "1.1rem",
              },
            }}
            highlightOnHover
            withTableBorder
            withColumnBorders
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Type</Table.Th>
                <Table.Th>Name Of Business</Table.Th>
                <Table.Th>Inspected By</Table.Th>
                <Table.Th>Sent To</Table.Th>
                <Table.Th align="right">Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data?.map((inspectionForm, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{inspectionForm.type}</Table.Td>
                  <Table.Td>{inspectionForm.form?.nameOfBusiness}</Table.Td>
                  <Table.Td>
                    <div className="flex gap-2 items-center">
                      <Avatar size="sm" src={inspectionForm.createdByUser?.photoURL} />
                      {inspectionForm.createdByUser?.display_name}
                    </div>
                  </Table.Td>
                  <Table.Td>{inspectionForm.sentTo}</Table.Td>
                  <Table.Td className="flex gap-2 items-center">
                    <Button
                      onClick={() => navigation.push(`/forms-saved/${inspectionForm.type}/${inspectionForm.id}`)}
                      size="md"
                    >
                      View Report
                    </Button>
                    {/* <SavePdfButton inspectionForm={inspectionForm} /> */}
                    {/* <ShareReportDialog {...inspectionForm} sentFrom="shibli" /> */}
                    {/* <SavePdfButton questionForm={inspectionForm.form} /> */}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      ) : (
        <div>
          <h1>No Data Found</h1>
        </div>
      )}
    </div>
  );
}

export default ViewSavedFormListByTypePage;
