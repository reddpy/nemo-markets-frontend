import NemoSplash from "../../../svgs/NemoSplash.svg";

import Image from "next/image";
const NoResults = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-5 mt-[40%]">
        <Image
          src={NemoSplash}
          height={200}
          width={200}
          alt="Nemo Splash Image"
        />
      </div>
      <p className="font-bold text-xl">Your search returned no results</p>
    </div>
  );
};

export default NoResults;
