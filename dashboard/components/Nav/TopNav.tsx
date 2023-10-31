"use client";

import { Menu, Group, Center, Burger, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import classes from "./TopNav.module.css";

interface Link {
  link: string;
  label: string;
  links?: Link[];
}

const links: Link[] = [
  { link: "/about", label: "About Us" },
  { link: "/pricing", label: "Pricing" },
  { link: "/faq", label: "FAQ" },
  { link: "/contact", label: "Contact" },
];

export function TopNav() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => <Menu.Item key={item.link}>{item.label}</Menu.Item>);

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a href={link.link} className={classes.link} onClick={(event) => event.preventDefault()}>
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a key={link.label} href={link.link} className={classes.link} onClick={(event) => event.preventDefault()}>
        {link.label}
      </a>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="xl">
        <div className={classes.inner}>
          <div className="text-blue-700 text-xl font-extrabold">EquipmentGram</div>
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>
    </header>
  );
}
