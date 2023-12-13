"use client";
import { useParams } from "next/navigation";
import { Chip, Button } from "@nextui-org/react";
import { OrgStatus, KeyMetrics } from "@/types/marketplace";
import AssetTable from "@/components/portfolio/asset-table";
import { Tooltip } from "@nextui-org/react";
import { MdOutlineAttachMoney } from "react-icons/md";

export async function getData(profile_name: string | string[]) {
  const response = await fetch(
    `http://localhost:4000/portfolio/${profile_name}`
  );

  const portfolio_data = await response.json();
  return portfolio_data;
}

const MarketPortfolio = async () => {
  const { profile } = useParams();
  const portfolio = await getData(profile);
  const asset_list = portfolio.assets;
  let status_color;

  if (portfolio.status === OrgStatus.Sunsetting) {
    status_color = "bg-[#F3EB25]";
  } else if (portfolio.status === OrgStatus.Bankruptcy) {
    status_color = "bg-[#BA0505]  text-white";
  }

  return (
    <div className="flex flex-col min-h-[70%]">
      <div id="company-overview" className="flex flex-row flex-wrap p-2 ml-1">
        <div className="flex-col md:max-w-[70%]  h-full">
          <div id="company-header" className="shadow-xl rounded-md ">
            <div className="flex flex-row min-w-[60px] max-w-[120px] pb-2 mt-1 ml-4">
              <img src={portfolio.display_url} alt={portfolio.company_name} />
              <span className="ml-4 mt-2"></span>
            </div>
          </div>
          <div id="company-about" className="p-2 shadow-xl rounded-md ">
            <p className="font-bold mb-4">About {portfolio.company_name}:</p>
            <p className="min-h-[100px]">{portfolio.company_about}</p>
            <div id="company-details" className="flex mt-4">
              <div className="flex flex-row flex-wrap space-x-4">
                <div className="flex flex-row mb-1">
                  <div id="investor-hover-button" className="space-x-2">
                    <Tooltip
                      content={
                        <div>
                          <p className="text-sm font-bold">Notable Investors</p>
                          <hr className="mb-1" />
                          <ol className="list-disc ml-5">
                            {portfolio.investors.map((investor: any) => {
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
                    {/* <HoverCard openDelay={150}>
                      <HoverCardTrigger>
                        <div className="flex flex-row shadow-md hover:text-blue-500 border bg-indigo-100 border-solid rounded-lg">
                          <span className="text-xs mr-1 ml-2 mt-[1px]">
                            Notable Investors
                          </span>
                          <MdOutlineAttachMoney />
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent side="right">
                        <div>
                          <p className="text-sm font-bold">Notable Investors</p>
                          <hr className="mb-1" />
                          <ol className="list-disc ml-5">
                            {portfolio.investors.map((investor: any) => {
                              return <li key={investor}>{investor}</li>;
                            })}
                          </ol>
                        </div>
                      </HoverCardContent>
                    </HoverCard> */}
                  </div>
                </div>
                <div className="flex flex-row mb-1">
                  <p className="font-light text-sm mr-2">Stage:</p>
                  <Chip size="sm" className="bg-nemo-blue text-white">
                    {portfolio.stage}
                  </Chip>
                </div>
                <div className="flex flex-row mb-1">
                  <p className="font-light text-sm mr-2">Headquarters:</p>
                  <Chip size="sm" className="bg-nemo-blue text-white">
                    {portfolio.headquarters}
                  </Chip>
                </div>
                <div className="flex flex-row mb-1 ">
                  <p className="font-light text-sm mr-2">Year Founded:</p>
                  <Chip
                    size="sm"
                    className="max-w-[50px] bg-nemo-blue text-white"
                  >
                    {portfolio.year_founded}
                  </Chip>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="company-key-metrics"
          className="flex-col shadow-xl rounded-md xl:ml-4 xl:min-w-[28%] lg:min-w-[28%] md:min-w-[28%] sm:min-w-full xs:w-fill p-2"
        >
          <p className="font-bold">Key Metrics:</p>
          <div id="metrics" className="text-center">
            {portfolio.key_metrics_json.map(
              (key_metric_obj: KeyMetrics, index: number) => {
                return (
                  <div className="mb-2" key={index}>
                    <p className="text-[#0920F5] text-2xl font-thin">
                      {key_metric_obj.header}
                    </p>
                    <p className="text-xl">{key_metric_obj.value}</p>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
      <div
        id="patents-table-section"
        className="flex flex-col rounded-md p-3 min-h-[34%]"
      >
        <div className="flex justify-between mx-2 mb-2">
          <p className="font-bold pt-2">
            Listed Assets{" "}
            <span className="bg-nemo-blue text-white rounded-md py-1 px-2">
              {asset_list.length}
            </span>
          </p>
          <Button className="bg-nemo-blue text-white pointer-events-none font-bold">
            Portfolio Asking Price: {portfolio.portfolio_price}
          </Button>
        </div>
        <AssetTable assets={asset_list} />
      </div>
    </div>
  );
};

export default MarketPortfolio;
