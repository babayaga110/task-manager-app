import React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { CssBaseline, Box ,Container} from "@mui/joy";

import Header from "../components/Navbars/Header";

const Layout = ({ children }) => {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
        <Header />
        <Container maxWidth="xl">
          <Box padding={4}>{children}</Box>
        </Container>
    </CssVarsProvider>
  );
};

export default Layout;
