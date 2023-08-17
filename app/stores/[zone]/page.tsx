"use client";

import StoreList from "@/app/components/StoreList";
import { StoreAdView } from "@/app/components/StoreAdView";

const StorePage = ({ params }: { params: { zone: string } }) => {
  return (
    <div>
      <StoreList zone={params.zone} />
      <StoreAdView zone={params.zone} />
    </div>
  );
};

export default StorePage;
