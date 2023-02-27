import * as React from "react";
import { Html, Head, Main, NextScript } from "next/document";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Link from "next/link";
import US from "../../public/usa-flag-svgrepo-com.svg";
import TW from "../../public/taiwan-svgrepo-com.svg";
import SvgIcon from "@mui/material/SvgIcon";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import { Icon } from "@mui/material";
import ButtonSpeedDial from "@/components/ButtonSpeedDial";
import PreviewIcon from "@mui/icons-material/Preview";
import ButtonGroup from "@mui/material/ButtonGroup";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LoginDialog from "@/components/LoginDialog";
import SignupDialog from "@/components/SignupDialog";
import cookie from "cookie";
import Cookies from "js-cookie";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `100%`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Layout({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [auth, setAuth] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [LoginDialogsClickOpen, setLoginDialogsClickOpen] =
    React.useState(false);
  const [SignupDialogsClickOpen, setSignupDialogsClickOpen] =
    React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const MenuOpen = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLoginDialogsClickClose = () => setLoginDialogsClickOpen(false);
  const handleLoginDialogsClickOpen = () => setLoginDialogsClickOpen(true);
  const handleSignupDialogsClickClose = () => setSignupDialogsClickOpen(false);
  const handleSignupDialogsClickOpen = () => setSignupDialogsClickOpen(true);
  const handleDrawer = () => setOpen(!open);
  const handleAuth = (account) => setAuth(account);
  const handleLogout = ()=>{
    setAuth(null)
    localStorage.removeItem("betitJwt")
  }

  if (typeof window !== "undefined") {
    const jwt = localStorage.getItem("betitJwt");
    if (jwt) {
      let token = "Bearer " + jwt;
      const myHeaders = new Headers();
      myHeaders.append("Authorization", token);
      let requestOptions = {
        method: "GET",
        headers: myHeaders,
      };
      let url = "https://www.betit.online/checkjwt";
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((response) => {
          setAuth(response["data"]["account"]);
          setEmail(response["data"]["email"]);
        })
        .catch((error) => {
          console.error(`Fetch error: ${error}`);
        });
    }
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} component="nav">
          <Toolbar sx={{ backgroundColor: "#242526" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawer}
              edge="start"
              sx={{
                marginRight: 5,
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h4" noWrap component="h4" sx={{ flexGrow: 1 }}>
              <Link href="/">Bet It</Link>
            </Typography>
            {auth && (
              <div>
                <Box>
                  <Button sx={{ color: "white",textTransform: "none" }} onClick={handleMenuClick}>
                    {auth}
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={MenuOpen}
                    onClose={handleMenuClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </Box>
              </div>
            )}
            {!auth && (
              <Box>
                <Button
                  color="inherit"
                  onClick={handleLoginDialogsClickOpen}
                  sx={{ textTransform: "none" }}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  sx={{ textTransform: "none" }}
                  onClick={handleSignupDialogsClickOpen}
                >
                  Sign up
                </Button>
              </Box>
            )}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader />
          <Divider />
          <List>
            <ListItem key="dashboard" disablePadding sx={{ display: "block" }}>
              <Link href="/dashboard">
                <Tooltip title="儀表板" placement="right-start">
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="儀表板"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Tooltip>
              </Link>
            </ListItem>

            {/*  */}
            <ListItem key="us" disablePadding sx={{ display: "block" }}>
              <Link href="/usStock">
                <Tooltip title="美股" placement="right-start">
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <SvgIcon component={US} inheritViewBox />
                    </ListItemIcon>
                    <ListItemText
                      primary="美股"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Tooltip>
              </Link>
            </ListItem>
            {/*  */}
            <ListItem key="tw" disablePadding sx={{ display: "block" }}>
              <Link href="/twStock">
                <Tooltip title="台股" placement="right-start">
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <SvgIcon component={TW} inheritViewBox />
                    </ListItemIcon>
                    <ListItemText
                      primary="台股"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Tooltip>
              </Link>
            </ListItem>
            {/*  */}
            <ListItem key="crypto" disablePadding sx={{ display: "block" }}>
              <Link href="/crypto">
                <Tooltip title="加密貨幣" placement="right-start">
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <CurrencyBitcoinIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="加密貨幣"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Tooltip>
              </Link>
            </ListItem>
            {/* 看賭局 */}
            <ListItem key="game" disablePadding sx={{ display: "block" }}>
              <Link href="/game">
                <Tooltip title="已經有的賭約" placement="right-start">
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <PreviewIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="打賭"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Tooltip>
              </Link>
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <main>{children}</main>
        </Box>
      </Box>
      <ButtonSpeedDial
        user={auth}
        email={email}
        login={handleLoginDialogsClickOpen}
      />
      <LoginDialog
        open={LoginDialogsClickOpen}
        clickClose={handleLoginDialogsClickClose}
        login={handleAuth}
      />
      <SignupDialog
        open={SignupDialogsClickOpen}
        clickClose={handleSignupDialogsClickClose}
      />
    </>
  );
}
