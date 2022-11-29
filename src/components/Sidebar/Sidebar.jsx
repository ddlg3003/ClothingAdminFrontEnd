import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import React from "react";
import useStyles from "./styles";
import { BLACK_LOGO } from "../../utils/globalVariables";
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';

const Sidebar = () => {
  const classes = useStyles();
  const sidebarIcon = [<BarChartIcon />, <CategoryIcon />, <CheckroomIcon />, <ShoppingCartIcon />, <PeopleIcon />];

  return (
    <>
      <Drawer classes={{ paper: classes.root }} variant="permanent" open={true}>
      <img src={BLACK_LOGO} className={classes.logo}/>
      <Divider />
        <List>
          {['Thống kê', 'Danh mục', 'Sản phẩm', 'Đơn hàng', 'Người dùng'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton sx={{ padding: '12px' }}>
                <ListItemIcon>
                  {sidebarIcon[index]}
                </ListItemIcon>
                <ListItemText>
                <Typography
                sx={{ display: 'inline' }}
                component="span"
                color="text.primary"
                fontSize={20}
              >
                {text}
              </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        {/* <List>
          {['TEST', 'TEST', 'TEST'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
    </>
  );
};

export default Sidebar;
