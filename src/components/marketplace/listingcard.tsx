"use client";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Tooltip,
} from "@nextui-org/react";
import { MdOutlineAttachMoney } from "react-icons/md";

import { MarketObject, OrgStatus } from "@/types/marketplace";
import { useRouter } from "next/navigation";

const ListingCard = ({
  id,
  asset_types,
  display_url,
  company_name,
  description,
  portfolio_price,
  investors,
  asset_count,
  status,
  sector,
  portfolio_unique_id,
}: MarketObject) => {
  const router = useRouter();

  let categories_str = asset_types.join(", ");
  let status_color: "warning" | undefined | "danger" | "default" = undefined;
  if (status === OrgStatus.Sunsetting) {
    status_color = "warning";
  } else if (status === OrgStatus.Bankruptcy) {
    status_color = "danger";
  }

  let asset_display =
    asset_count != 0 ? `${asset_count} Asset(s) Listed | ` : "";

  const clickRedirect = () =>
    router.push(`/marketplace/portfolio/${portfolio_unique_id}`);

  return (
    <Card
      className="cursor-pointer max-w-[350px] shadow-sm hover:border-nemo-blue  border-2"
      isPressable
      onPress={clickRedirect}
    >
      <CardHeader className="flex pb-0">
        <div className="flex flex-row ml-20">
          <div className="min-h-[60px] max-h-[60px] min-w-[60px] max-w-[120px]">
            <img src={display_url} alt={company_name} />
          </div>
          <span className="ml-4">
            <Chip color={status_color}>{status}</Chip>
          </span>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="py-0">
        <div id="sale-title" className="flex flex-col py-0">
          <p className="text-xs ">Whats for sale?</p>
          <h3 className="text-lg font-bold mr-1 min-h-[60px]">{description}</h3>
        </div>
        <div id="assets-numbers" className="flex flex-row mb-2">
          <div className="text-xs">
            <span className="font-semibold">{asset_display}</span>
            <span className="mr-1">{categories_str}</span>
          </div>
        </div>
        <div id="pricing">
          <hr className="mb-1" />
          <p className="text-xs">Portfolio Price:</p>
          <h3 className="text-lg font-bold mr-1">{portfolio_price}</h3>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <Tooltip
          content={
            <div>
              <p className="text-sm font-bold">Notable Investors</p>
              <hr className="mb-1" />
              <ol className="list-disc ml-5">
                {investors.map((investor: any) => {
                  return <li key={investor}>{investor}</li>;
                })}
              </ol>
            </div>
          }
          placement="right"
        >
          <div className="flex flex-row shadow-md hover:text-blue-500 border bg-indigo-100 border-solid rounded-lg">
            <span className="text-xs mr-1 ml-2 mt-[1px]">
              Notable Investors
            </span>
            <MdOutlineAttachMoney />
          </div>
        </Tooltip>
      </CardFooter>
    </Card>
  );
};

export default ListingCard;
