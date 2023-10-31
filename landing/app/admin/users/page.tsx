"use client";

import { UserItem } from "@/components/admin/UserItem";
import { useAuth } from "@/lib/authContext";
import { UserType, useUsers } from "@/lib/network/users";
import { Checkbox } from "@mantine/core";
import { NextPage } from "next";
import { useState } from "react";

const Inspectors: NextPage = () => {
  // const [types, setTypes] = useQueryState<UserType[]>("types", [UserType.admin, UserType.inspector, UserType.customer]);
  const [types, setTypes] = useState<UserType[]>([UserType.admin, UserType.inspector, UserType.customer]);
  const [userIds] = useState<string[]>([]);
  const { user, loading } = useAuth();
  const { data: users } = useUsers();

  const selectedUsers = users?.filter((u) => userIds.includes(u.user_id));
  console.log("selectedUsers", selectedUsers);
  console.log("userId", userIds);

  if (loading) return <h1>Loading...</h1>;
  if (!user) return <h1>U need to login</h1>;

  return (
    <div className="-mx-4 flex flex-wrap">
      <div className="w-full px-4 lg:w-4/12">
        <div className="mb-8 rounded-lg shadow-card border-[#e7e7e7] bg-white">
          <div className="border-b border-[#e7e7e7] py-4 px-8 lg:px-6 xl:px-8">
            <h3 className="text-base font-semibold text-body-color sm:text-lg lg:text-base xl:text-lg">
              Filter by Type
            </h3>
          </div>
          <div className="space-y-4 py-9 px-8 lg:px-6 xl:px-8">
            <Checkbox.Group
              defaultValue={types}
              withAsterisk
              onChange={(values) => {
                setTypes(values as UserType[]);
              }}
            >
              <div className="space-y-4">
                <Checkbox value={UserType.admin} label="Admin" />
                <Checkbox value={UserType.inspector} label="Inspector" />
                <Checkbox value={UserType.customer} label="Customer" />
              </div>
            </Checkbox.Group>
          </div>
        </div>
      </div>
      <div className="w-full px-4 lg:w-8/12">
        <div className="h-full items-center justify-center rounded-lg border-[#e7e7e7]">
          <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200 flex flex-col">
              {selectedUsers?.map((user) => (
                <UserItem user={user} emphasize={true} key={user.id} />
              ))}
              {users
                ?.filter((u) => types.includes(u.type))
                .map((user) => (
                  <UserItem user={user} key={user.id} />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inspectors;
