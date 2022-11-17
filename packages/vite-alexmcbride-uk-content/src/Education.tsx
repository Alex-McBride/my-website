import DescriptionIcon from "@mui/icons-material/Description";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SchoolIcon from "@mui/icons-material/School";
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

export function Education() {
  return (
    <Stack sx={{ width: [1, 1, 1, 1, 2 / 3] }} spacing={1}>
      <Typography variant="h2">Education</Typography>
      <Card>
        <CardHeader
          title="Strathclyde University"
          subheader="BSc (Hons 1st class) Computer Science, 2013-2016"
        />
        <List>
          <ListItem>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Graduated with a First Class degree with Honours."></ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmojiEventsIcon />
            </ListItemIcon>
            <ListItemText primary="Awarded the Andrew McGettrick prize for best graduating Honours student."></ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText
              primary="In my final year project, I implemented TINY on an FPGA."
              secondary="TINY is a theoretical 4-bit computer architecture used to teach students how machines execute assembly code."
            ></ListItemText>
          </ListItem>
        </List>
      </Card>
    </Stack>
  );
}
