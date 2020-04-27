import React from "react";
import MapPopup from "../MapPopup";

const MemoPopup = React.memo(({ country, closeCountryPopup }) => {
  return (
    <MapPopup
      country={country}
      closeCountryPopup={() => {
        closeCountryPopup(null);
      }}
    />
  );
});

export default MemoPopup;
