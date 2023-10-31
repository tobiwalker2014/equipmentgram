"use client";

import { signOut, useAuth } from "@/lib/authContext";
import { useGetUser } from "@/lib/network/users";
import { Avatar, Group, Menu, Text, UnstyledButton, rem } from "@mantine/core";
import { IconAddressBook, IconLogout, IconSettings, IconUser } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { forwardRef } from "react";

type Props = {};

const NavUserMenu = (props: Props) => {
  const { user } = useAuth();
  const { data: userData } = useGetUser(user?.claims.user_id as string);
  const router = useRouter();

  if (!user) return null;

  return (
    <Menu withArrow>
      <Menu.Target>
        <UserButton image={userData?.photoURL!} name={userData?.display_name!} userType={userData?.type!} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() => router.push("/profile")}
          leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          onClick={() => router.push("/my-contacts")}
          leftSection={<IconAddressBook style={{ width: rem(14), height: rem(14) }} />}
        >
          Contact
        </Menu.Item>
        <Menu.Item
          onClick={() => router.push("/account-settings")}
          leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}
        >
          Account Settings
        </Menu.Item>

        <Menu.Divider />
        <Menu.Item
          onClick={signOut}
          color="red"
          leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NavUserMenu;

interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  image: string;
  name: string;
  userType: string;
  icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, userType, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        color: "var(--mantine-color-text)",
        borderRadius: "var(--mantine-radius-sm)",
      }}
      {...others}
    >
      <Group>
        <div style={{ flex: 1, textAlign: "right" }}>
          <Text size="sm" fw={500}>
            {name}
          </Text>

          <Text c="dimmed" size="xs">
            {userType}
          </Text>
        </div>

        <Avatar src={image} radius="xl" />
        {/* {icon || <IconChevronDown size="1rem" />} */}
      </Group>
    </UnstyledButton>
  )
);
