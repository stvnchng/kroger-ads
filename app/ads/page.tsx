import StoreListNav from "@/app/components/StoreListNav";
import StoreAdView from "@/app/components/StoreAdView";

import { stores } from "../stores";

const AllLatestAdsPage = () => {
  return (
    <div className="flex flex-col">
      <StoreListNav />
      {Object.keys(stores).map((zone, index) => (
        <StoreAdView key={`${zone}_${index}`} zone={zone} />
      ))}
    </div>
  );
};

export default AllLatestAdsPage;
