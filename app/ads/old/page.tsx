import StoreListNav from "@/app/components/StoreListNav";
import { StoreAdView } from "@/app/components/StoreAdView";

import { stores } from "../stores";

const AllOldAdsPage = () => {
  return (
    <div className="flex flex-col">
      <StoreListNav />
      {Object.keys(stores).map((zone, index) => (
        <StoreAdView key={`${zone}_${index}`} zone={zone} showOldAds />
      ))}
    </div>
  );
};

export default AllOldAdsPage;
