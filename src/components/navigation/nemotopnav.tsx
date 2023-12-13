import Image from "next/image";
import NemoGeneralLogo from "../../../svgs/NemoGeneralLogo.svg";
import UserButton from "./user-button";

const NemoTopNavbar = () => {
  return (
    <div
      className="
      flex 
      justify-between 
      rounded-lg m-1 px-4  mt-1
      items-center h-16 
      shadow-md 
      border-solid 
      border-1
      mb-2
      max-h-[3rem]
      "
    >
      <div className="">
        <Image
          src={NemoGeneralLogo}
          alt="nemo general logo"
          width={100}
          height={100}
        />
      </div>
      <div>
        <UserButton />
      </div>
    </div>
  );
};

export default NemoTopNavbar;
