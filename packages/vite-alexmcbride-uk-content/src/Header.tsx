import { Article, GitHub } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

const links: { href: string; text: string }[] = [
  { text: "Home", href: "/" },
  // { text: "Solitaire", href: "/solitaire/" },
];

const githubLink = "https://github.com/Alex-McBride";
// Not in VCS, just manually uploaded to S3, so reference it explicitly even when running locally
const cvLink = "https://alexmcbride.uk/AlexMcBrideCV.pdf";

export function Header() {
  return (
    <Box sx={{ width: [1, 1, 1, 1, 2 / 3] }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            {links.map(({ text, href }) => (
              <Button href={href} key={href} sx={{ color: "inherit" }}>
                {text}
              </Button>
            ))}
            <span style={{ flexGrow: 1 }} />
            <Button
              href={githubLink}
              sx={{ color: "inherit" }}
              aria-label="GitHub"
              endIcon={<GitHub />}
            >
              GitHub
            </Button>
            <Button
              href={cvLink}
              sx={{ color: "inherit" }}
              aria-label="My CV/Resume"
              endIcon={<Article />}
            >
              My CV
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
