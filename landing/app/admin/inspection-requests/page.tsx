"use client";

import { InspectionItem } from "@/components/admin/InspectionItem";
import { Step } from "@/components/forms/StepWidget";
import { useAuth } from "@/lib/authContext";
import { useInspectionRequests, useInspectionRequestsForUser } from "@/lib/network/inspection-requests";
import { NextPage } from "next";
import { useState } from "react";
import { Tab } from "../layout";

const InspectionRequests: NextPage = () => {
  // const [currentTab, setCurrentTab] = useState<Tab>(Tab.InspectionRequests);
  const [sortByName, setSortByName] = useState<boolean>(false);
  const [sortBySubmitted, setSortBySubmitted] = useState<boolean>(false);
  const [sortByWaitTime, setSortByWaitTime] = useState<boolean>(false);
  const [selectedSteps, setSelectedSteps] = useState<Step[]>([]);
  const { user, loading } = useAuth();
  const { data: allInspectionRequests, isLoading: isAllInspectionRequestsLoading } = useInspectionRequests();

  const { data: allInspectionRequestsForUser, isLoading: isAllInspectionRequestsLoadingForUser } =
    useInspectionRequestsForUser(user?.claims.user_id as string);

  if (loading) return <h1>Loading...</h1>;
  if (!user) return <h1>U need to login</h1>;

  return (
    <div className="-mx-4 flex flex-wrap">
      <div className="w-full px-4 lg:w-4/12">
        <div className="mb-8 rounded-lg shadow-card border-[#e7e7e7] bg-white">
          <div className="border-b border-[#e7e7e7] py-4 px-8 lg:px-6 xl:px-8">
            <h3 className="text-base font-semibold text-body-color sm:text-lg lg:text-base xl:text-lg">
              Filter by Step
            </h3>
          </div>
          <div className="space-y-4 py-9 px-8 lg:px-6 xl:px-8">
            {Object.values(Step)
              .slice(1)
              .map((step) => (
                <div key={step}>
                  <label
                    htmlFor={`checkbox-${step}`}
                    className="flex cursor-pointer select-none items-center text-black"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id={`checkbox-${step}`}
                        className="sr-only"
                        checked={selectedSteps.includes(step)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSteps([...selectedSteps, step]);
                          } else {
                            setSelectedSteps(selectedSteps.filter((s) => s !== step));
                          }
                        }}
                      />
                      <div className="box mr-4 flex h-5 w-5 items-center justify-center rounded border">
                        <span className="opacity-0">
                          <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                              fill="#3056D3"
                              stroke="#3056D3"
                              stroke-width="0.4"
                            ></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                    {step}
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div className="mb-8 rounded-lg shadow-card border-[#e7e7e7] bg-white">
          <div className="border-b border-[#e7e7e7] py-4 px-8 lg:px-6 xl:px-8">
            <h3 className="text-base font-semibold text-body-color sm:text-lg lg:text-base xl:text-lg">Sort By</h3>
          </div>
          <div className="space-y-4 py-9 px-8 lg:px-6 xl:px-8">
            <div key="Name">
              <label htmlFor={`checkbox-Name`} className="flex cursor-pointer select-none items-center text-black">
                <div className="relative">
                  <input
                    type="checkbox"
                    id={`checkbox-Name`}
                    className="sr-only"
                    checked={sortByName}
                    onChange={(e) => setSortByName(e.target.checked)}
                  />
                  <div className="box mr-4 flex h-5 w-5 items-center justify-center rounded border">
                    <span className="opacity-0">
                      <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                          fill="#3056D3"
                          stroke="#3056D3"
                          stroke-width="0.4"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </div>
                Name
              </label>
            </div>
            <div key="Submitted">
              <label htmlFor={`checkbox-Submitted`} className="flex cursor-pointer select-none items-center text-black">
                <div className="relative">
                  <input
                    type="checkbox"
                    id={`checkbox-Submitted`}
                    className="sr-only"
                    checked={sortBySubmitted}
                    onChange={(e) => setSortBySubmitted(e.target.checked)}
                  />
                  <div className="box mr-4 flex h-5 w-5 items-center justify-center rounded border">
                    <span className="opacity-0">
                      <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                          fill="#3056D3"
                          stroke="#3056D3"
                          stroke-width="0.4"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </div>
                Submitted
              </label>
            </div>
            <div key="WaitTime">
              <label htmlFor={`checkbox-WaitTime`} className="flex cursor-pointer select-none items-center text-black">
                <div className="relative">
                  <input
                    type="checkbox"
                    id={`checkbox-WaitTime`}
                    className="sr-only"
                    checked={sortByWaitTime}
                    onChange={(e) => setSortByWaitTime(e.target.checked)}
                  />
                  <div className="box mr-4 flex h-5 w-5 items-center justify-center rounded border">
                    <span className="opacity-0">
                      <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                          fill="#3056D3"
                          stroke="#3056D3"
                          stroke-width="0.4"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </div>
                Wait Time
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-4 lg:w-8/12">
        <div className="h-full items-center justify-center rounded-lg border-[#e7e7e7]">
          <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200 flex flex-col">
              {allInspectionRequests?.map((inspection) => (
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
