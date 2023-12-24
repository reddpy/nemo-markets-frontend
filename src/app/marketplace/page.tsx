import ListingCard from "@/components/marketplace/listingcard";
import Search from "@/components/marketplace/search";
import NoResults from "@/components/marketplace/noresults";
import { MarketObject } from "@/types/marketplace";
import AssetFilter from "@/components/marketplace/asset-filter";
import SectorFilter from "@/components/marketplace/sector-filter";

export async function getData() {
  const response = await fetch("http://localhost:4000/marketplace", {
    cache: "no-store",
  });
  const data = await response.json();
  return data.portfolios;
}

const MarketPlace = async () => {
  let market_data = await getData();

  let market_listings = market_data.map((market_item: MarketObject) => {
    return <ListingCard key={market_item.id} {...market_item} />;
  });

  return (
    <>
      <div className="flex flex-col">
        <Search />
        <div className="ml-1 mr-1 mt-2 flex flex-row rounded-lg border border-solid">
          {/* <span className="text-xs pt-3 pl-3 ">Filters: </span>
          <SectorFilter />
          <AssetFilter /> */}
        </div>
      </div>
      <div className="scrollbar-thin scrollbar-thumb-nemo-blue scrollbar-track-gray-100 	mt-2 h-[83%] overflow-y-auto rounded-xl bg-slate-100 p-2 shadow-inner">
        <div className="flex flex-row flex-wrap justify-center gap-4 ">
          {market_listings.length > 0 ? market_listings : <NoResults />}
        </div>
      </div>
    </>
  );
};

export default MarketPlace;
