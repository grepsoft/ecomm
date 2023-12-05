import logo from "./logo.svg";
import "./App.css";
import { Container, Typography, Box, Stack, Grid, Button } from "@mui/material";
import Appbar from "./components/appbar";
import { ThemeProvider } from "@mui/system";
import theme from "./styles/theme";
import Banner from "./components/banner";
import Products from "./components/products";
import { UIProvider } from "./context/ui";
import Footer from "./components/footer";
import AppDrawer from "./components/drawer";
import Promotions from "./components/promotions";
import SearchBox from "./components/search";
import { useEffect } from "react";
import Cart from "./components/cart";
import UserProvider from "./context/ui/User";
import AiChat from "./components/aichat/aiChat";

function App() {
  useEffect(() => {
    document.title = "React Material UI - Home";
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Container
        disableGutters
        maxWidth="xl"
        sx={{
          background: "#fff",
        }}
      >
        <Stack>
          <UIProvider>
            <UserProvider>
              <Appbar />
              <Banner />
              <Promotions />
              <SearchBox />
              <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
                <Typography variant="h4">Our Products</Typography>
              </Box>
              <Products />
              <Footer />
              <AppDrawer />
              <Cart />
              <AiChat />
            </UserProvider>
          </UIProvider>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
