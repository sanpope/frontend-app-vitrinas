import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import SideBar from "../component/SideBar";
import Header from "../component/Header";

export default function RootLayout() {
  return (
    <Grid templateColumns="repeat(6, 1fr)" bg="gray.50">
      <GridItem as="aside" colSpan={{ base: 4, lg: 2, xl: 1 }}>
        <SideBar />
      </GridItem>

      <GridItem as="main" colSpan={{ base: 6, lg: 4, xl: 5 }}>
        <Header />
        <Outlet />
      </GridItem>
    </Grid>
  );
}
