import { AiOutlineCode, AiOutlineTool } from "react-icons/ai";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import {
  LiaBitcoin,
  LiaSatelliteDishSolid,
  LiaSchoolSolid,
} from "react-icons/lia";
import { LuBrainCircuit, LuFilter, LuShoppingBag } from "react-icons/lu";
import { MdOutlineAttachMoney } from "react-icons/md";
import { TbHealthRecognition } from "react-icons/tb";
import { Link } from "@nextui-org/react";

const SectorFilter = () => {
  return (
    <></>
    // <Popover>
    //   <PopoverTrigger asChild>
    //     <Link underline="none" className=" hover:bg-white hover:text-[#254AF3]">
    //       <LuFilter size={15} />
    //       Asset
    //     </Link>
    //     {/* <Button
    //       variant={"link"}
    //       className=" hover:bg-white hover:text-[#254AF3]"
    //     >
    //       <LuFilter size={15} />
    //       Sector
    //     </Button> */}
    //   </PopoverTrigger>
    //   <PopoverContent
    //     className="
    //    flex flex-col
    //    border rounded-lg shadow-lg
    //    m-1
    //    p-2
    //    min-w-[150px]
    //    max-w-[180px]
    //    "
    //   >
    //     <h2 className="font-bold mb-2">Select Sector</h2>
    //     <label
    //       htmlFor="fintech"
    //       className="flex flex-row justify-between mb-3 p-1 hover:opacity-[0.7] hover:bg-slate-100"
    //     >
    //       <div className="mt-[2px]">
    //         <MdOutlineAttachMoney />
    //       </div>
    //       <p className="font-light text-sm">FinTech</p>

    //       <input
    //         id="fintech"
    //         name="category"
    //         value="fintech"
    //         type="checkbox"
    //         className=" mt-1 h-4 w-4  accent-[#254AF3]"
    //       />
    //     </label>
    //     <label
    //       htmlFor="ai"
    //       className="flex flex-row justify-between mb-3 p-1 hover:opacity-[0.7] hover:bg-slate-100"
    //     >
    //       <div className="mt-[2px]">
    //         <LuBrainCircuit />
    //       </div>
    //       <p className="font-light text-sm">AI</p>
    //       <input
    //         id="ai"
    //         name="category"
    //         value="ai"
    //         type="checkbox"
    //         className=" mt-1 h-4 w-4  accent-[#254AF3]"
    //       />
    //     </label>
    //     <label
    //       htmlFor="healthcare"
    //       className="flex flex-row justify-between mb-3 p-1 hover:opacity-[0.7] hover:bg-slate-100"
    //     >
    //       <div className="mt-[2px]">
    //         <TbHealthRecognition />
    //       </div>
    //       <p className="font-light text-sm">Healthcare</p>
    //       <input
    //         id="healthcare"
    //         name="category"
    //         value="healthcare"
    //         type="checkbox"
    //         className="mt-1 h-4 w-4  accent-[#254AF3]"
    //       />
    //     </label>
    //     <label
    //       htmlFor="b2bsaas"
    //       className="flex flex-row justify-between mb-3 p-1 hover:opacity-[0.7] hover:bg-slate-100"
    //     >
    //       <div className="mt-[2px]">
    //         <BiBriefcaseAlt2 />
    //       </div>
    //       <p className="font-light text-sm">B2B SaaS</p>
    //       <input
    //         id="b2bsaas"
    //         name="category"
    //         value="b2bsaas"
    //         type="checkbox"
    //         className="mt-1 h-4 w-4  accent-[#254AF3]"
    //       />
    //     </label>
    //     <label
    //       htmlFor="ecommerce"
    //       className="flex flex-row justify-between mb-3 p-1 hover:opacity-[0.7] hover:bg-slate-100"
    //     >
    //       <div className="mt-[2px]">
    //         <LuShoppingBag />
    //       </div>
    //       <p className="font-light text-sm">E-Commerce</p>
    //       <input
    //         id="ecommerce"
    //         name="category"
    //         value="ecommerce"
    //         type="checkbox"
    //         className="mt-1 h-4 w-4  accent-[#254AF3]"
    //       />
    //     </label>
    //     <label
    //       htmlFor="web3"
    //       className="flex flex-row justify-between mb-3 p-1 hover:opacity-[0.7] hover:bg-slate-100"
    //     >
    //       <div className="mt-[2px]">
    //         <LiaBitcoin />
    //       </div>
    //       <p className="font-light text-sm">Crypto/Web3</p>
    //       <input
    //         id="web3"
    //         name="category"
    //         value="web3"
    //         type="checkbox"
    //         className="mt-1 h-4 w-4  accent-[#254AF3]"
    //       />
    //     </label>
    //     <label
    //       htmlFor="defense"
    //       className="flex flex-row justify-between mb-3 p-1 hover:opacity-[0.7] hover:bg-slate-100"
    //     >
    //       <div className="mt-[2px]">
    //         <LiaSatelliteDishSolid />
    //       </div>
    //       <p className="font-light text-sm">Defense</p>
    //       <input
    //         id="defense"
    //         name="category"
    //         value="defense"
    //         type="checkbox"
    //         className="mt-1 h-4 w-4  accent-[#254AF3]"
    //       />
    //     </label>
    //     <label
    //       htmlFor="education"
    //       className="flex flex-row justify-between mb-3 p-1 hover:opacity-[0.7] hover:bg-slate-100"
    //     >
    //       <div className="mt-[2px]">
    //         <LiaSchoolSolid />
    //       </div>
    //       <p className="font-light text-sm">Education</p>
    //       <input
    //         id="education"
    //         name="category"
    //         value="education"
    //         type="checkbox"
    //         className="mt-1 h-4 w-4  accent-[#254AF3]"
    //       />
    //     </label>
    //     <label
    //       htmlFor="devtools"
    //       className="flex flex-row justify-between mb-3 p-1 hover:opacity-[0.7] hover:bg-slate-100"
    //     >
    //       <div className="mt-[2px]">
    //         <AiOutlineCode />
    //       </div>
    //       <p className="font-light text-sm">Developer Tools</p>
    //       <input
    //         id="devtools"
    //         name="category"
    //         value="devtools"
    //         type="checkbox"
    //         className="mt-1 h-4 w-4  accent-[#254AF3]"
    //       />
    //     </label>
    //     <label
    //       htmlFor="industrial"
    //       className="flex flex-row justify-between mb-3 p-1 hover:opacity-[0.7] hover:bg-slate-100"
    //     >
    //       <div className="mt-[2px]">
    //         <AiOutlineTool />
    //       </div>
    //       <p className="font-light text-sm">Industrial</p>
    //       <input
    //         id="industrial"
    //         name="category"
    //         value="industrial"
    //         type="checkbox"
    //         className="mt-1 h-4 w-4  accent-[#254AF3]"
    //       />
    //     </label>
    //   </PopoverContent>
    // </Popover>
  );
};

export default SectorFilter;
