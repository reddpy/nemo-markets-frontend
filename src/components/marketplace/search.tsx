"use client";
import { AiOutlineFileSearch } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { Button } from "@nextui-org/react";

const Search = () => {
  const formData = new FormData();
  formData.append("myKey", "KARAN");

  return (
    <>
      <div className="flex flex-col ml-1">
        <div id="search-bar" className="flex flex-row mt-1">
          <Input
            className=" max-w-[40%]  focus-visible:ring-1 focus-visible:ring-nemo-blue"
            type="text"
            placeholder="Search Nemo Markets"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
              }
            }}
          />

          <Button
            className="rounded-md text-white min-w-[15%] ml-2 mr-2 bg-nemo-blue hover:bg-white hover:text-nemo-blue hover:border-nemo-blue hover:border horver:border-solid"
            // type="submit"
            onClick={() => {
              submitFunction(formData, {
                action: "/marketplace",
                method: "get",
              });
            }}
          >
            <AiOutlineFileSearch size={25} />
            Search
          </Button>
        </div>
      </div>
    </>
  );
};

export default Search;
