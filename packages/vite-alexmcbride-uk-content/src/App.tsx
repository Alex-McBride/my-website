import { ChangeHistoryRounded } from '@mui/icons-material'
import { AppBar, Container, createTheme, CssBaseline, SvgIcon, ThemeProvider, Toolbar, Typography } from '@mui/material'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { Hero } from './Hero'
import { Skills } from './Skills';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  return (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Parallax pages={2}>
      <Hero offset={0}/>
      <Skills offset={1}/>
    </Parallax>
  </ThemeProvider>
  )
}

export default App
