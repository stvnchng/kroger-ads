"use client";

import Link from "next/link";
import { stores } from "./ads/stores";
import { capitalize } from "./utils";

export default function Page() {
  return (
    <ul className="pl-6 mt-6 ml-4">
      <li className="mb-6">
        <Link
          href={`/ads`}
          as={`/ads`}
          className="text-blue-400 underline hover:text-blue-700 transition"
        >
          <strong>Weekly Ad - Show All</strong>
        </Link>
      </li>
      {Object.keys(stores).map((zone) => (
        <li key={zone} className="mb-6">
          <Link
            href={`/ads/${zone}`}
            as={`/ads/${zone}`}
            className="text-blue-400 underline hover:text-blue-700 transition"
            target="_blank"
          >
            Weekly Ad - {stores[zone]?.info || capitalize(zone)}
          </Link>
        </li>
      ))}
    </ul>
  );
}

// "use client";

// import { useEffect, useMemo, useState } from "react";
// import CouponGroup from "./CouponGroup";

// export default function Home() {
//   const [coupons, setCoupons] = useState([]);
//   const [categories, setCategories] = useState([]);

//   const [selectedSpecialSavings, setSelectedSpecialSavings] = useState(["wdd"]); // Initial selected filters

//   const [location, setLocation] = useState("Jackson");
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const locationIdMap: Record<string, string> = {
//     Jackson: "02500497",
//     Dallas: "540FC005",
//     test: "03500517",
//   };
//   const headers = useMemo(
//     () => ({
//       "X-Kroger-Channel": "WEB",
//       "X-Laf-Object": JSON.stringify([
//         {
//           fallbackFulfillment: locationIdMap[location],
//           createdDate: new Date().getTime(),
//           destination: { locationId: locationIdMap[location] },
//           id: "597642a6-53cb-4cdc-84fc-525911247a5a",
//           isCrossBanner: false,
//           modalityType: "PICKUP",
//           source: "PROFILE",
//           fulfillment: [locationIdMap[location]],
//           isTrustedSource: true,
//         },
//         {
//           fallbackFulfillment: locationIdMap[location],
//           fallbackDestination: locationIdMap[location],
//           createdDate: new Date().getTime(),
//           destination: {
//             address: {
//               postalCode: "75080",
//               stateProvince: "TX",
//               countryCode: "US",
//               county: "Dallas County",
//             },
//             location: { lat: 32.96738052, lng: -96.74510193 },
//           },
//           id: "1d095ce3-966f-4556-a526-4c44b40a83fc",
//           modalityType: "DELIVERY",
//           provider: "HomeDelivery",
//           source: "PROFILE",
//           // fulfillment: ["540FC005", "03500517", "03500526", "540DA005"],
//           isTrustedSource: true,
//         },
//         {
//           fallbackFulfillment: "02500497",
//           createdDate: 1672679363158,
//           destination: { locationId: "02500497" },
//           id: "902f9a81-17e6-4338-b7ac-2f9648888f3a",
//           isCrossBanner: false,
//           modalityType: "IN_STORE",
//           source: "PROFILE",
//           fulfillment: ["02500497"],
//           isTrustedSource: true,
//         },
//         {
//           fallbackDestination: "02500497",
//           createdDate: 1660192856254,
//           destination: {
//             address: {
//               addressLines: ["243 Huntington Hollow"],
//               cityTown: "Brandon",
//               postalCode: "39047",
//               stateProvince: "MS",
//               countryCode: "US",
//               county: "Rankin County",
//             },
//             location: { lat: 32.366387, lng: -90.036296 },
//           },
//           id: "4d2f5a34-a5c7-4903-b56a-1eeef14c9f46",
//           fallbackFulfillment: "491DC001",
//           modalityType: "SHIP",
//           source: "PROFILE",
//           fulfillment: [
//             "491DC001",
//             "309DC309",
//             "310DC310",
//             "DSV00001",
//             "MKTPLACE",
//           ],
//           isTrustedSource: true,
//         },
//       ]),
//     }),
//     [location, locationIdMap]
//   );

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `/coupons?filter.specialSavings=${selectedSpecialSavings.join(",")}`
//           // {
//           //   headers: headers,
//           // }
//         );
//         const jsonData = await response.json();

//         const coupons = Object.values(jsonData.data.couponData.coupons);
//         const couponsByCategory = coupons.reduce((acc, curr) => {
//           const category = curr.categories[0];
//           acc[category] = acc[category] || [];
//           acc[category].push(curr);
//           return acc;
//         }, {});
//         setCoupons(couponsByCategory);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchData();
//   }, [headers, selectedSpecialSavings]);

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="w-full max-w-[90vw] p-6 flex flex-col">
//         <h1 className="text-center">Kroger Coupons</h1>
//         <FilterBar
//           selectedSpecialSavings={selectedSpecialSavings}
//           setSelectedSpecialSavings={setSelectedSpecialSavings}
//         />
//         <FilterCategories
//           categories={categories}
//           setCategories={setCategories}
//         />

//         {Object.entries(coupons).map(([category, coupons]) => {
//           console.log(categories);
//           return !categories.length || categories.includes(category) ? (
//             <CouponGroup category={category} coupons={coupons} key={category} />
//           ) : null;
//         })}
//       </div>
//     </div>
//   );
// }

// const FilterBar = ({ selectedSpecialSavings, setSelectedSpecialSavings }) => {
//   const availableOptions = [
//     { value: "wdd", label: "Weekly Digital Deals" },
//     { value: "hotp6", label: "5 times" },
//     { value: "5x", label: "5X Event" },
//     // Add more options here
//   ];

//   const handleCheckboxChange = (event) => {
//     const { value, checked } = event.target;
//     if (checked) {
//       setSelectedSpecialSavings((prevSelected) => [...prevSelected, value]);
//     } else {
//       setSelectedSpecialSavings((prevSelected) =>
//         prevSelected.filter((option) => option !== value)
//       );
//     }
//   };

//   return (
//     <div className="mb-4">
//       <label>Filter by Special Savings:</label>
//       <div className="flex flex-wrap">
//         {availableOptions.map((option) => (
//           <label key={option.value} className="mr-4">
//             <input
//               type="checkbox"
//               value={option.value}
//               checked={selectedSpecialSavings.includes(option.value)}
//               onChange={handleCheckboxChange}
//             />
//             {option.label}
//           </label>
//         ))}
//       </div>
//     </div>
//   );
// };

// const FilterCategories = ({ categories, setCategories }) => {
//   const availableOptions = [
//     "Produce",
//     "Dairy",
//     "Beverages",
//     "Bakery",
//     "Snacks",
//     "Breakfast",
//     "Condiment & Sauces",
//     "Natural & Organic",
//     "Canned & Packaged",
//     "Baby",
//     "Pasta Sauces Grain",
//     "Personal Care",
//     "Frozen",
//     "Cleaning Products",
//     "Baking Goods",
//     "Meat & Seafood",
//     "General",
//     "Beauty",
//     "Health",
//     "Paper & Plastics",
//     "Candy",
//     "Kitchen",
//     "International",
//     "Deli",
//     "Garden & Patio",
//     "Adult Beverage",
//     "Electronics",
//     "Home Decor",
//     "Office School & Crafts",
//     "Natural Foods",
//     "Health & Beauty",
//   ];

//   const handleCheckboxChange = (event) => {
//     const { value, checked } = event.target;
//     if (checked) {
//       setCategories((prevSelected) => [...prevSelected, value]);
//     } else {
//       setCategories((prevSelected) =>
//         prevSelected.filter((option) => option !== value)
//       );
//     }
//   };

//   return (
//     <div className="mb-4">
//       <label>Show coupons for:</label>
//       <div className="flex flex-wrap">
//         {availableOptions.map((option) => (
//           <label key={option} className="mr-4">
//             <input
//               type="checkbox"
//               value={option}
//               checked={categories.includes(option)}
//               onChange={handleCheckboxChange}
//             />
//             {option}
//           </label>
//         ))}
//       </div>
//     </div>
//   );
// };
