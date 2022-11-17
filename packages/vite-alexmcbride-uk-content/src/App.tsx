import {
  AppBar,
  Box,
  CssBaseline,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import { Education } from "./Education";
import { Employment } from "./Employment";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Skills } from "./Skills";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          padding: 2,
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          justifyContent: `center`,
          rowGap: 5,
        }}
      >
        <Header />
        <Hero />
        <Skills />
        <Employment />
        <Education />
      </Box>
    </ThemeProvider>
  );
}

export default App;
