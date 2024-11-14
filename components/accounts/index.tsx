"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import { ExportIcon } from "@/components/icons/accounts/export-icon";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { TableWrapper } from "@/components/table/table";
import { useDownloadPlayers } from "@/app/services/useDownloadPlayers";


export const Accounts = () => {
  const { downloadPlayers } = useDownloadPlayers();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
  };

  console.log(searchQuery, "searchQuery");
  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        <li className="flex gap-2">
          <HouseIcon />
          <Link href={"/"}>
            <span>Home</span>
          </Link>
          <span> / </span>{" "}
        </li>

        <li className="flex gap-2">
          <UsersIcon />
          <span>Players</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>List</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">All Players</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search users"
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Search Players"
          />
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <Button
            onClick={downloadPlayers}
            color="primary"
            startContent={<ExportIcon />}>
            Export to CSV
          </Button>
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper searchQuery={searchQuery}/>
      </div>
    </div>
  );
};
