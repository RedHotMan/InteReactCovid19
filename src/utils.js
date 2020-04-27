import axios from "axios";

export const formatNumber = (number, options) => {
  return new Intl.NumberFormat("en-US", { ...options }).format(number);
};

// This shit is here only because of Safari that not support compact Intl.NumberFormat option...
export const formatFabNumbers = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    if (num >= 100000) {
      return (num / 1000).toFixed(0).replace(/\.0$/, "") + "K";
    }
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num;
};

export const addArrayValues = (accumulator, currentValue) =>
  accumulator + currentValue;

export const getCountriesData = async () => {
  let fetchedData = [];
  await axios
    .get(`${process.env.REACT_APP_API_URL}/countries`)
    .then((response) => {
      localStorage.setItem("data", JSON.stringify(response.data));
      localStorage.setItem("lastUpdate", new Date().getTime());
      fetchedData = response.data;
    })
    .catch((e) => {
      console.error(e);
    });

  return fetchedData;
};

export const isLastUpdateTooOld = (lastUpdate) => {
  return (
    new Date().getTime() - process.env.REACT_APP_DATA_EXPIRATION > lastUpdate
  );
};
