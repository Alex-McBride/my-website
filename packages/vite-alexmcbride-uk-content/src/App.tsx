import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { Education } from './Education';
import { Employment } from './Employment';
import { Hero } from './Hero';
import { Skills } from './Skills';
import { theme } from './theme';


function App() {
  return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box sx={{
      padding: 2,
      display: `flex`,
      flexDirection: `column`,
      alignItems: `center`,
      justifyContent: `center`,
      rowGap: 5
    }}>
      <Hero/>
      <Skills/>
      <Employment/>
      <Education/>
    </Box>
  </ThemeProvider>
  )
}

export default App
