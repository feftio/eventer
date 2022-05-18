import React from "react";
import { AccountCircle } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useRootDispatch, useRootSelector } from "src/redux";
import { logout } from "src/redux/user/functions";

const ProfileMenu: React.FC<{}> = () => {
    const dispatch = useRootDispatch();
    const username = useRootSelector((state) => state.user.username);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                size="large"
                aria-label="cabinet of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{ borderRadius: 1 }}
            >
                <Typography variant="h6" sx={{ mr: 1 }}>
                    {username}
                </Typography>
                <AccountCircle />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        dispatch(logout());
                    }}
                >
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
};

export default ProfileMenu;
