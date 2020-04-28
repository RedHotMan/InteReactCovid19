import React from "react";
import { IconButton, InputBase } from "@material-ui/core";
import { SearchForm } from "./style";

const Search = ({ searchedCountry, searchForCountry, setSearchedCountry }) => {
  return (
    <SearchForm
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        searchForCountry();
      }}
    >
      <IconButton onClick={() => searchForCountry()}>
        <i style={{ color: "#fff" }} className="ri-search-line"></i>
      </IconButton>
      <InputBase
        style={{ marginLeft: "2rem", color: "#fff" }}
        placeholder="Search for a country…"
        value={searchedCountry}
        onChange={(e) => setSearchedCountry(e.target.value)}
      />
    </SearchForm>
  );
};

export default Search;
