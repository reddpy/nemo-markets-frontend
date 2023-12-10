"use client";

import { useClerk, useUser } from "@clerk/clerk-react";
import { CiLogout, CiUser } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserButton = () => {
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleSignOut = () => {
    return signOut(() => {
      window.location.reload();
    });
  };

  const handleAccountSettings = () => {
    console.log("settings page!");
  };

  let conditional_margin = "";
  if (user) {
    conditional_margin = " mt-1.5";
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={"rounded-full" + conditional_margin}>
        <Avatar>
          <AvatarImage src={user?.imageUrl} alt="User" />
          <AvatarFallback className="bg-nemo-blue text-white">
            <CiUser />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="hover:bg-nemo-blue"
          onClick={handleAccountSettings}
        >
          <CiUser size={20} />
          <p className="ml-2 ">Account Settings</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:bg-nemo-blue"
          onClick={handleSignOut}
        >
          <CiLogout size={20} />
          <p className="ml-2 ">Log Out</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
