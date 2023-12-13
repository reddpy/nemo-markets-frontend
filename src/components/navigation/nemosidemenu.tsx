import SidebarLink from "./sidebarlink";

const NemoSideMenu = () => {
  return (
    <div
      className="
          flex flex-col	items-center
          border rounded-lg shadow-lg
          ml-2
          min-w-[60px]
          h-fill
          "
    >
      <SidebarLink link_name="Marketplace" link="/marketplace" />
      <SidebarLink link_name="Vault" link="/vault" />
      <SidebarLink link_name="Discovery" link="/discovery" />
      <SidebarLink link_name="Terminal" link="/terminal" />
    </div>
  );
};

export default NemoSideMenu;
