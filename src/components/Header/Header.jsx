import { AppBar, Avatar, Button, Menu, MenuItem, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../features/auth";
import useStyles from "./styles";

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  let currentAuthHovering = false;
  const [anchorElAuth, setAnchorElAuth] = useState(null);

  // Auth hover functions
  const handleClickAuth = (e) => {
    if (anchorElAuth !== e.currentTarget) {
      setAnchorElAuth(e.currentTarget);
    }
  };

  const handleHoverAuth = (e) => {
    currentAuthHovering = true;
  };

  const handleCloseAuth = () => {
    setAnchorElAuth(null);
  };

  const handleLogout = () => {
    setAnchorElAuth(null);

    dispatch(logout());
  };

  const handleCloseHoverAuth = (e) => {
    currentAuthHovering = false;

    setTimeout(() => {
      if (!currentAuthHovering) {
        handleCloseAuth();
      }
    }, 50);
  };

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ marginLeft: "240px", justifyContent: "flex-end" }}>
        <Button
          color="primary"
          onClick={handleClickAuth}
          onMouseOver={handleClickAuth}
          sx={{ color: "white" }}
          onMouseLeave={handleCloseHoverAuth}
        >
          <Avatar sx={{ width: 32, height: 32 }} /> &nbsp; ADMIN
        </Button>
        <Menu
          // className={classes.dropdown}
          anchorEl={anchorElAuth}
          keepMounted
          open={Boolean(anchorElAuth)}
          onClose={handleCloseAuth}
          MenuListProps={{
            onMouseEnter: handleHoverAuth,
            onMouseLeave: handleCloseHoverAuth,
            style: { pointerEvents: "auto" },
          }}
          anchorOrigin={{
            horizontal: "left",
            vertical: "bottom",
          }}
          PopoverClasses={{
            root: classes.popOverRoot,
          }}
          PaperProps={{
            style: {
              width: 150,
            },
          }}
        >
          {/* <Link
                        to="/"
                        style={{
                            textDecoration: 'none',
                            color: 'black',
                        }}
                    >
                        <MenuItem onClick={handleCloseAuth}>
                            Trang cá nhân
                        </MenuItem>
                    </Link> */}
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
          </Link>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
