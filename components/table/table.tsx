"use client";
import {
  Input,
  Link,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useState, useEffect, useCallback, SetStateAction, Dispatch } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { RenderCell } from "./render-cell";
import { Player } from "@/app/types/playerTypes";
import { fetchPlayers } from '@/app/services/playerService';
import { searchPlayers } from "@/app/services/searchPlayers";
import debounce from "lodash.debounce";
import { DebouncedFunc } from "lodash";
import Avatar from "../ui/avatar";
import { Image } from "@nextui-org/react";

export const columns = [
  { name: 'Telegram Id', uid: 'telegramId' },
  { name: 'User Name', uid: 'userName' },
  { name: 'Game Balance', uid: 'gameBalance' },
  { name: 'Tap Balance', uid: 'tapBalance' },
  { name: 'Last Activity', uid: 'lastActivity' },
  { name: 'ACTIONS', uid: 'actions' },
];

interface TableWrapperProps {
  searchQuery?: string;
}

export const TableWrapper: React.FC<TableWrapperProps> = ({ searchQuery = "" }) => {

  const [players, setPlayers] = useState<Player[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 20;

  const [openDetails, setOpenDetails] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const handleOpenDetails: Dispatch<Player> = (value) => {
    setSelectedPlayer(value);
    setOpenDetails(true);
  };

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      try {
        const data = await searchPlayers(query, page, limit);
        setPlayers(data.players);
        setTotalPages(data.totalPages);

      } catch (error) {
        console.error("Failed to search players:", error);
      }
    }, 250),
    [page, limit]
  );

  useEffect(() => {
    const getPlayers = async () => {
      setLoading(true);
      try {
        let data;
        if (searchQuery.trim().length >= 3) {
          // data = await searchPlayers(searchQuery, page, limit);
          // setPlayers(data.players);
          debouncedSearch(searchQuery);
        } else {
          data = await fetchPlayers(page, limit);
          setPlayers(data.data);
        }

        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Failed to fetch players:', error);
      } finally {
        setLoading(false);
      }
    };

    getPlayers();
  }, [page, searchQuery]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (!players) {
    return (
      <div className="flex flex-col gap-4">
        <p>Loading...</p>
      </div>
    )
  }

  console.log(openDetails, selectedPlayer);
  return (
    <div className=" w-full flex flex-col gap-4">
      <Table
        isStriped
        aria-label="Example table with custom cells"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody items={players}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {RenderCell({
                    player: item,
                    columnKey: columnKey
                  }, handleOpenDetails)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-center mt-4">
        <Pagination
          total={totalPages}
          page={page}
          onChange={handlePageChange}
          isDisabled={loading}
        />
      </div>

      {selectedPlayer && (
        <Modal
          backdrop={"opaque"}
          isOpen={openDetails}
          onOpenChange={setOpenDetails}
          radius="lg"
          size="2xl"
        >
          <ModalContent>
            <ModalHeader
              className="flex flex-col gap-1 border-b border-default-400 dark:border-default-400/10">
              <div className="flex items-center gap-2">
                <Avatar userId={selectedPlayer.telegramId} />

                <div className="flex flex-col">
                  <span className="text-lg text-default-800">
                    {selectedPlayer.userName ? `@${selectedPlayer.userName}` : `==/==`}
                  </span>

                  <span className="text-sm text-zinc-500">
                    {selectedPlayer.firstName ? `${selectedPlayer.firstName}` : `==/==`} &nbsp;
                    {selectedPlayer.lastName ? `${selectedPlayer.lastName}` : `==/==`} &nbsp;

                    <span>
                      ({selectedPlayer.languageCode})
                    </span>
                  </span>
                </div>
              </div>
            </ModalHeader>

            <ModalBody
              className="pt-4"
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-2">
                    <Input
                      isDisabled
                      type="text"
                      color="warning"
                      label="User Name"
                      className="opacity-100"
                      defaultValue={selectedPlayer.userName ? `@${selectedPlayer.userName}` : `==/==`}
                      placeholder="User Name" />

                    <Input
                      isDisabled
                      type="text"
                      color="secondary"
                      label="First Name"
                      className="opacity-100"
                      defaultValue={selectedPlayer.firstName ? selectedPlayer.firstName : "==/=="}
                      placeholder="First Name" />

                    <Input
                      isDisabled
                      type="text"
                      color="secondary"
                      label="Last Name"
                      className="opacity-100"
                      defaultValue={selectedPlayer.lastName ? selectedPlayer.lastName : "==/=="}
                      placeholder="" />
                  </div>

                  <Input
                    isDisabled
                    type="text"
                    color="success"
                    label="Telegram ID"
                    className="opacity-100"
                    defaultValue={selectedPlayer.telegramId}
                    placeholder="Telegram ID" />

                  <div className="flex flex-row gap-2">
                    <Input
                      type="text"
                      label="Game Balance"
                      className="opacity-100"
                      defaultValue={selectedPlayer.gameBalance ? `${selectedPlayer.gameBalance}` : "0"}
                      placeholder="Game Balance" />

                    <Input
                      type="text"
                      label="Tap Balance"
                      className="opacity-100"
                      defaultValue={selectedPlayer.tapBalance ? `${selectedPlayer.tapBalance}` : "0"}
                      placeholder="Tap Balance" />
                  </div>

                  <div className="flex flex-row gap-2">
                    <Input
                      isDisabled
                      type="text"
                      label="Game Level"
                      className="opacity-100"
                      defaultValue={selectedPlayer.gameLevelId ? `${selectedPlayer.gameLevelId}` : "0"}
                      placeholder="Game Level" />

                    <Input
                      isDisabled
                      type="text"
                      label="Energy Limit"
                      className="opacity-100"
                      defaultValue={selectedPlayer.energyLimitLevelId ? `${selectedPlayer.energyLimitLevelId}` : "0"}
                      placeholder="Energy Limit" />

                    <Input
                      isDisabled
                      type="text"
                      label="MultiTap Level"
                      className="opacity-100"
                      defaultValue={selectedPlayer.multiTapLevelId ? `${selectedPlayer.multiTapLevelId}` : "0"}
                      placeholder="MultiTap Level" />

                    <Input
                      isDisabled
                      type="text"
                      label="Recharging Speed"
                      className="opacity-100"
                      defaultValue={selectedPlayer.rechargingSpeedLevelId ? `${selectedPlayer.rechargingSpeedLevelId}` : "0"}
                      placeholder="Recharging Speed Level" />
                  </div>
                </div>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

    </div>
  );
};


