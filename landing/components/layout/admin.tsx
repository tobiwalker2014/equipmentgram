import classNames from "classnames";
import Link from "next/link";
import React from "react";

export enum Tab {
  InspectionRequests = "Inspection Requests",
  InspectionReports = "Inspection Reports",
  Users = "Users",
  Tools = "Admin Tools",
}

export function mapTabToPath(tab: Tab): string {
  switch (tab) {
    case Tab.InspectionRequests:
      return "/admin/inspection-requests";
    case Tab.InspectionReports:
      return "/admin/inspection-reports";
    case Tab.Users:
      return "/admin/users";
    case Tab.Tools:
      return "/admin/tools";
  }
}

export type AdminLayoutProps = {
  children: React.ReactNode;
  currentTab: Tab;
};

export const AdminLayout = (props: AdminLayoutProps) => {
  return (
    <div className="container">
      <section className="bg-white pt-10 pb-12 lg:pt-[60px] lg:pb-[90px]">
        <div className="container mx-auto">
          <div className="mb-10 rounded-lg shadow-card border-[#e7e7e7] bg-white p-5">
            <div className="-mx-4 flex flex-wrap items-center justify-between">
              <div className="w-full px-4 sm:w-1/2">
                <div className="sm:hidden relative">
                  <label htmlFor="tabs" className="sr-only">
                    Select a tab
                  </label>
                  {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                  <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 cursor-pointer select-none"
                    defaultValue={props.currentTab}
                    onChange={(e) => {
                      mapTabToPath(e.target.value as Tab);
                    }}
                  >
                    {Object.values(Tab).map((tab) => (
                      <option key={tab}>{tab}</option>
                    ))}
                  </select>
                </div>
                <div className="hidden sm:block">
                  <nav className="flex space-x-4" aria-label="Tabs">
                    {Object.values(Tab).map((tab) => (
                      <Link href={mapTabToPath(tab)} key={tab}>
                        <div
                          key={tab}
                          className={classNames(
                            tab === props.currentTab
                              ? "bg-gray-100 text-gray-700"
                              : "text-gray-500 hover:text-gray-700",
                            "rounded-md px-3 py-2 text-sm font-medium cursor-pointer select-none"
                          )}
                          aria-current={
                            tab === props.currentTab ? "page" : undefined
                          }
                        >
                          {tab}
                        </div>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>
          {props.children}
        </div>
      </section>
    </div>
  );
};
