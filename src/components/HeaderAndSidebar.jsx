import React from "react";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import useStyles from "./styles";

const HeaderAndSidebar = () => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <Sidebar />
      <main className={classes.main}>
        <Outlet />
      </main>
    </>
  );
};

export default HeaderAndSidebar;
