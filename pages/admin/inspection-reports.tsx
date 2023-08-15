import { NextPage } from "next";
import React, { useState } from "react";
import { AdminLayout, Tab } from "../../components/layout/admin";
import { useAuth } from "../../lib/authContext";
import {
  useInspectionRequests,
  useInspectionRequestsForUser,
} from "../../lib/network/inspection-requests";

const InspectorReports: NextPage = () => {
  const { user, loading } = useAuth();
  const {
    data: allInspectionRequests,
    isLoading: isAllInspectionRequestsLoading,
  } = useInspectionRequests();

  const {
    data: allInspectionRequestsForUser,
    isLoading: isAllInspectionRequestsLoadingForUser,
  } = useInspectionRequestsForUser(user?.claims.user_id as string);

  if (loading) return <h1>Loading...</h1>;
  if (!user) return <h1>U need to login</h1>;

  return (
    <AdminLayout currentTab={Tab.InspectionReports}>
      <div className="-mx-4 flex flex-wrap">TODO: Reports page</div>
    </AdminLayout>
  );
};

export default InspectorReports;
