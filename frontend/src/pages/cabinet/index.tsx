import * as React from "react";
import { styled, useTheme, Theme, CSSObject, Button } from "@mui/material";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRootDispatch, useRootSelector } from "src/redux";
import { logout } from "src/redux/user/functions";
import withAuthRedirect from "src/hoc/withAuthRedirect";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CabinetManager from "./manager";
import Swal from "src/swal";

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
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
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
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
    zIndex: 50,
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

const CabinetPage: React.FC<{}> = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useRootDispatch();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                    }}
                >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setOpen(true)}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: "none" }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Cabinet
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={() => setOpen(false)}>
                        {theme.direction === "rtl" ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {CabinetManager.forEach((fragmentType, fragmentObject) => (
                        <ListItemButton
                            key={fragmentType}
                            sx={{
                                minHeight: 48,
                                backgroundColor:
                                    location.pathname ===
                                    fragmentObject.fullPath()
                                        ? "#f5f5f5"
                                        : "transparent",
                                justifyContent: open ? "initial" : "center",
                                px: 2.5,
                            }}
                            onClick={() => {
                                navigate(fragmentObject.path);
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center",
                                }}
                            >
                                {fragmentObject.icon()}
                            </ListItemIcon>
                            <ListItemText
                                primary={fragmentObject.label}
                                sx={{ opacity: open ? 1 : 0 }}
                            />
                        </ListItemButton>
                    ))}
                </List>
                <Divider />
                <List>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            backgroundColor: "transparent",
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                        }}
                        onClick={() => {
                            Swal.fire({
                                title: "Do you want to logout from your account?",
                                showDenyButton: true,
                                confirmButtonText: "Yes",
                                denyButtonText: "No",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    dispatch(logout());
                                }
                            });
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : "auto",
                                justifyContent: "center",
                            }}
                        >
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Logout"
                            sx={{ opacity: open ? 1 : 0 }}
                        />
                    </ListItemButton>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 5 }}>
                <DrawerHeader />
                <Outlet />
            </Box>
        </Box>
    );
};

export default withAuthRedirect(CabinetPage);
