import axios from "axios";

export const formatNumber = (number, options) => {
  return new Intl.NumberFormat("en-US", { ...options }).format(number);
};

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
