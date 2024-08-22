import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const SITE_HEADER_DISPLAY_TITLE = "Loblaws UI Test";
const HEADER_BUTTON_CTA_DISPLAY_TEXT = "View all campaigns";

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
            component={Link}
            to="/"
          >
            {SITE_HEADER_DISPLAY_TITLE}
          </Typography>
          <Button variant="outlined" color="inherit" to="/" component={Link}>
            {HEADER_BUTTON_CTA_DISPLAY_TEXT}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
