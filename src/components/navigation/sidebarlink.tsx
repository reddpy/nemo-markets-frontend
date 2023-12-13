"use client";
import { Tooltip } from "@nextui-org/react";

import { AiOutlineLock, AiOutlineShop } from "react-icons/ai";
import { BsTerminal } from "react-icons/bs";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

interface SideBar {
  link_name: string;
  link: string;
}

import { usePathname } from "next/navigation";

const SidebarLink: React.FC<SideBar> = ({ link_name, link }) => {
  const location = usePathname();

  const active_link: boolean = location.includes(link);
  let base_style = "p-3 rounded-md mt-1 mb-2 ";
  const conditional_style = !active_link
    ? "text-nemo-blue hover:bg-nemo-blue hover:text-white"
    : "bg-nemo-blue text-white";

  base_style += conditional_style;

  let Icon = null;
  switch (link_name) {
    case "Discovery":
      Icon = <HiOutlineMagnifyingGlass size={20} />;
      break;
    case "Marketplace":
      Icon = <AiOutlineShop size={20} />;
      break;
    case "Terminal":
      Icon = <BsTerminal size={20} />;
      break;
    case "Vault":
      Icon = <AiOutlineLock size={20} />;
      break;
  }

  return (
    <Tooltip
      className="rounded-md bg-nemo-blue text-white"
      content={link_name}
      placement="right"
    >
      <a href={link} className={base_style}>
        {Icon}
      </a>
    </Tooltip>
  );
};

export default SidebarLink;
