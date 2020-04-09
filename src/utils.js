export const formatNumber = (number, options) => {
  return new Intl.NumberFormat("en-US", { ...options }).format(number);
};
