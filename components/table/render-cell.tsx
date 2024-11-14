import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { Player } from "@/app/types/playerTypes";
import Avatar from "../ui/avatar";

interface Props {
  player: Player;
  columnKey: string | React.Key;
}

export const RenderCell = ({ player, columnKey}: Props, handleOpenDetails: (player: Player) => void) => {
  // @ts-ignore
  const cellValue = player[columnKey];
  switch (columnKey) {
    case "userName":
      const displayName = player.userName
        ? player.userName
        : player.firstName && player.lastName
          ? `${player.firstName} ${player.lastName}`
          : player.firstName || player.lastName || "No name available";

      return (
        <div className="flex items-center gap-2">
          <Avatar userId={player.telegramId} />
          <span className="text-default-900 text-xs">{displayName}</span>
        </div>
      );

    case "telegramId":
      return (
        <div>
          <span className="text-success text-xs">{cellValue}</span>
        </div>
      );

    case "actions":
      return (
        <div className="flex items-center gap-4 ">
          <div>
            <Tooltip content="Details">
              <button onClick={() => handleOpenDetails(player)}>
                <EyeIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>

          <div>
            <Tooltip content="Edit user" color="secondary">
              <button onClick={() => console.log("Edit user")}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          
          <div>
            <Tooltip
              content="Delete user"
              color="danger"
              onClick={() => console.log("Delete user")}
            >
              <button>
                <DeleteIcon size={20} fill="#FF0080" />
              </button>
            </Tooltip>
          </div>
        </div>
      );

    default:
      return <div>
        <span className="text-default-900 text-xs">{cellValue}</span>
      </div>;
  }
};
