import { createTheme, Theme, ThemeOptions } from "@mui/material";
import { deepmerge } from "@mui/utils";

/* We want to polyfill flag emojis for systems (e.g. Windows) that do not support them out of the box. The way we achieve this is
 * by using a custom font which only declares glyphs for the flag codepoints, and nothing else. This font needs to be prepended
 * to the default theme's typography.fontFamily. Unfortunately, this is not exposed to us as a constant, so instead we need to
 * perfom it in two steps: first, create the theme we want, then create a new theme which uses the default theme's values.
 */
export const theme: Theme = (function () {
  const themeOptions: ThemeOptions = {
    palette: {
      mode: "dark",
    },
  };
  const baseTheme = createTheme(themeOptions);
  return createTheme(deepmerge(polyfillFlagEmojis(baseTheme), themeOptions));
})();

function polyfillFlagEmojis(theme: Theme): ThemeOptions {
  return {
    typography: {
      fontFamily: `"Twemoji Country Flags", ` + theme.typography.fontFamily,
    },
  };
}
