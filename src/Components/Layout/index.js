import React, { lazy, Suspense } from "react";
import { Container } from "./style";
import Header from "../Header";
import Loader from "../Loader";

const Mapbox = lazy(() => import("../../Containers/Map"));

const Layout = () => {
  return (
    <Container>
      <Header />
      <Suspense fallback={<Loader />}>
        <Mapbox />
      </Suspense>
    </Container>
  );
};

export default Layout;
