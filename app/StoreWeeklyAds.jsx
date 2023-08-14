import Link from "next/link";

const StoreList = () => {
  const stores = {
    columbus: "Columbus Store",
    houston: "Houston Store",
    // Add more store names here
  };

  return (
    <div>
      <h1>Weekly Ads</h1>
      <ul>
        {Object.entries(stores).map(([storeKey, storeName]) => (
          <li key={storeKey}>
            <Link href={`/stores/${storeKey}`} as={`/stores/${storeKey}`}>
              <a>{storeName}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreList;
