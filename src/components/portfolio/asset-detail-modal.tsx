import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Chip } from "@nextui-org/react";
import { FaExternalLinkAlt } from "react-icons/fa";

let USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

const AssetDetailModal = ({
  asking_price,
  category,
  description,
  name,
  stage,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-nemo-blue text-white">
          <FaExternalLinkAlt />
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[250px] mx-4">
        <SheetHeader className="flex flex-col justify-between flex-wrap">
          <div className="mt-1">
            <p className="font-light text-nemo-blue">Asset</p>
            <SheetTitle>{name}</SheetTitle>
          </div>
          <div>
            <p className="font-light text-nemo-blue">Category</p>
            <Chip color="primary">{category}</Chip>
          </div>
          <div>
            <p className="font-light text-nemo-blue">Status</p>
            <Chip color="success">{stage}</Chip>
          </div>
          <div>
            <p className="font-light text-nemo-blue">Asking Price</p>
            <Chip>
              <span className="font-bold">{USDollar.format(asking_price)}</span>
            </Chip>
          </div>
        </SheetHeader>
        <div className="flex flex-col mt-10">
          <p className="font-light text-nemo-blue">Asset Overview</p>
          <p>{description}</p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AssetDetailModal;
