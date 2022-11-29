import { AppBar, Avatar, Stack, Toolbar, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ marginLeft: "240px", justifyContent: "flex-end" }}>
          <Stack
            direction="row"
            spacing={1.5}
            justifyContent="center"
            alignItems="center"
          >
            <Avatar />
            <Typography>ADMIN</Typography>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
