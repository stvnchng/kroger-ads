export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const formatDate = (d: string) => {
  const YYYYMMdd = d.split("T")[0].split("-");
  const month = YYYYMMdd[1];
  const day = YYYYMMdd[2];
  return `${month}/${day}`;
};
