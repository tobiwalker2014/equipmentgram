"use client";

import CustomLoader from "@/components/Loader";
import { useAuth } from "@/lib/authContext";
import {
  InspectionFormWithId,
  InspectionReportStatus,
  useGetInspectionFormsByStatus,
  useUpdateInspectionFormStatus,
} from "@/lib/network/forms";
import { Button, Table } from "@mantine/core";
import { NextPage } from "next";

const InspectionReports: NextPage = () => {
  const { user } = useAuth();
  const { data, refetch, isLoading } = useGetInspectionFormsByStatus(InspectionReportStatus.FilledForm);

  if (isLoading) return <CustomLoader />;

  if (!user) return <h1>U need to login</h1>;

  return (
    <>
      {data && data.length > 0 ? (
        <Table.ScrollContainer minWidth={500}>
          <Table withColumnBorders={true} withRowBorders={true} withTableBorder={true}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Customer Name</Table.Th>
                <Table.Th>Customer Email</Table.Th>
                <Table.Th> Status</Table.Th>
                <Table.Th>Type</Table.Th>
                <Table.Th w={100}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data?.map((d, i) => (
                <Table.Tr key={i}>
                  <Table.Td>{d.createdByUser?.display_name}</Table.Td>
                  <Table.Td>{d.createdByUser?.email}</Table.Td>
                  <Table.Td>Waiting for approval</Table.Td>
                  <Table.Td>{d.type}</Table.Td>
                  <Table.Td>
                    <UpdateInspectionFormStatusButton refetch={() => refetch({})} inspectionFormWithId={d} />
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      ) : (
        <h1>No pending reports to approve</h1>
      )}
    </>
  );
};

export default InspectionReports;

const UpdateInspectionFormStatusButton = ({
  inspectionFormWithId,
  refetch,
}: {
  inspectionFormWithId: InspectionFormWithId;
  refetch: any;
}) => {
  const { mutateAsync, isLoading } = useUpdateInspectionFormStatus(InspectionReportStatus.Approved);

  return (
    <Button
      size="xs"
      loading={isLoading}
      variant="filled"
      color="teal"
      onClick={async () => {
        mutateAsync(inspectionFormWithId.id);
        refetch();
      }}
    >
      Approve
    </Button>
  );
};
