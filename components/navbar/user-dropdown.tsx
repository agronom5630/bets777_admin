import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarItem,
} from "@nextui-org/react";
import React from "react";
import { DarkModeSwitch } from "./darkmodeswitch";
import { useAdmin } from "@/app/context/adminProvider";
import { useRouter } from 'next/navigation';

export const UserDropdown = () => {
  const { role, email, username, logout } = useAdmin();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push('/login');
  };
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            as="button"
            color="secondary"
            size="md"
            src="/images/ninja.jpg"
          />
        </DropdownTrigger>
      </NavbarItem>

      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem
          key="profile"
          className="flex flex-col justify-center w-full items-center"
        >
          <p className="text-center">Signed in as <span className="italic text-blue-700"> {username}</span></p>
          <p className="italic text-green-600">{email}</p>
        </DropdownItem>

        <DropdownItem key="role">
          <div className="flex justify-between w-full items-center">
            <span>Role</span>
            <span className="italic text-yellow-400">{role}</span>
          </div>
        </DropdownItem>

        <DropdownItem key="switch">
          <div className="flex justify-between w-full items-center">
            <span>Theme Mode</span> <DarkModeSwitch />
          </div>
        </DropdownItem>

        <DropdownItem key="logout" color="danger" className="text-danger">
          <p className="text-center" onClick={handleLogout}>Log Out</p>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
