import Image from "next/image";

const CouponGroup = ({ category, coupons }) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-semibold mb-4">{category}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-screen-lg">
        {coupons.map((coupon) => (
          <Coupon key={coupon.id} coupon={coupon} />
        ))}
      </div>
    </div>
  );
};

const Coupon = ({ coupon }) => {
  // console.log(coupon);

  const formatDateToMMDD = (date) => {
    date = new Date(date);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}/${day}`;
  };

  const daysLeft = (date) => {
    const diff = new Date(date).getTime() - new Date().getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days;
  };
  return (
    <div className="p-2 border mb-2">
      <div className="relative h-0" style={{ paddingBottom: "100%" }}>
        <Image
          layout="fill"
          objectFit="cover"
          src={coupon.imageUrl}
          alt={coupon.displayDescription}
        />
      </div>
      <strong>{coupon.shortDescription}</strong>
      <div>
        Expires {formatDateToMMDD(coupon.expirationDate)}.{" "}
        {daysLeft(coupon.expirationDate)} days left!
      </div>
      <div>
        <strong>More details:</strong> {coupon.requirementDescription}
      </div>
    </div>
  );
};

export default CouponGroup;
