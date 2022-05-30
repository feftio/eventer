import React from "react";
import { Button } from "@mui/material";
import { FormType } from "src/pages/auth/index";
import classes from "src/pages/auth/style.module.scss";

interface PanelProps {
    setForm: React.Dispatch<React.SetStateAction<FormType>>;
}

export const RightPanel: React.FC<PanelProps> = (props) => {
    return (
        <div
            className={`${classes["overlay-panel"]} ${classes["overlay-right"]}`}
        >
            <h1>Hello, Friend!</h1>
            <p className={classes["p"]}>
                Enter your personal details and start journey with us
            </p>
            <Button
                variant="outlined"
                onClick={() => {
                    props.setForm(FormType.Registration);
                }}
                sx={{
                    color: "#fff",
                    borderColor: "#fff",
                    textTransform: "none",
                }}
            >
                Sign Up
            </Button>
        </div>
    );
};

export const LeftPanel: React.FC<PanelProps> = (props) => {
    return (
        <div
            className={`${classes["overlay-panel"]} ${classes["overlay-left"]}`}
        >
            <h1>Welcome Back!</h1>
            <p className={classes["p"]}>
                To keep connected with us please login with your personal info
            </p>
            <Button
                variant="outlined"
                onClick={() => {
                    props.setForm(FormType.Login);
                }}
                sx={{
                    color: "#fff",
                    borderColor: "#fff",
                    textTransform: "none",
                }}
            >
                Sign In
            </Button>
        </div>
    );
};
