import { Box, Typography } from "@mui/material";

export function Hero() {
  return (
    <Box sx={{ width: [1, 1, 1, 1, 2 / 3] }}>
      <Typography variant="h2" component="h1">
        Hi, I'm Alex
      </Typography>
      <Typography variant="subtitle1">
        I'm a full-stack software engineer based in Edinburgh, Scotland
      </Typography>
    </Box>
  );
}
