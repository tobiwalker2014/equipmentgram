"use client";

import CustomLoader from "@/components/Loader";
import { InspectionItem } from "@/components/admin/InspectionItem";
import { Step } from "@/components/forms/StepWidget";
import { useAuth } from "@/lib/authContext";
import { useInspectionRequests, useInspectionRequestsForUser } from "@/lib/network/inspection-requests";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { Alert, Checkbox } from "@mantine/core";
import { NextPage } from "next";
import { useState } from "react";

const InspectionRequests: NextPage = () => {
  const [steps, setSteps] = useState<Step[]>([Step.Schedule]);
  const { user, loading } = useAuth();
  const { data: allInspectionRequests, isLoading: isAllInspectionRequestsLoading } = useInspectionRequests();

  // const { data: allInspectionRequestsForUser, isLoading: isAllInspectionRequestsLoadingForUser } =
  //   useInspectionRequestsForUser(user?.claims.user_id as string);

  if (loading || isAllInspectionRequestsLoading) return <CustomLoader />;
  if (!user) return <h1>U need to login</h1>;

  return (
    <div className="-mx-4 flex flex-wrap">
      <div className="w-full px-4 lg:w-4/12">
        <div className="mb-8 border bg-white">
          <div className="border-b p-4">
            <h3 className="text-base font-semibold text-body-color sm:text-lg lg:text-base xl:text-lg">
              Filter by Step
            </h3>
          </div>
          <div className="space-y-4  p-4">
            <Checkbox.Group
              defaultValue={steps}
              withAsterisk
              onChange={(values) => {
                setSteps(values as Step[]);
              }}
            >
              <div className="space-y-4">
                <Checkbox value={Step.Schedule} label="Schedule" />
                <Checkbox value={Step.Inspection} label="Inspector" />
                <Checkbox value={Step.Payment} label="Payment" />
                {/* <Checkbox value={Step.Request} label="Request" /> */}
                <Checkbox value={Step.Results} label="Results" />
                <Checkbox value={Step.Complete} label="Complete" />
              </div>
            </Checkbox.Group>
          </div>
        </div>
      </div>
      <div className="w-full px-4 lg:w-8/12">
        <div className="h-full items-center justify-center border">
          <div className="overflow-hidden bg-white  ">
            <ul role="list" className="divide-y divide-gray-200 flex flex-col">
              {allInspectionRequests?.filter((inspection) => steps.includes(inspection.step)).length === 0 && (
                <Alert color="red" icon={<InformationCircleIcon />} className="m-10">
                  No inspection requests found for the selected steps
                </Alert>
              )}

              {allInspectionRequests
                ?.filter((inspection) => steps.includes(inspection.step))
                .map((inspection) => (
                  <InspectionItem inspection={inspection} key={inspection.id} />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionRequests;
