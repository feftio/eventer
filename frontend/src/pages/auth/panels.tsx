import React from "react";
import { Button } from "@mui/material";
import { FormType } from "src/pages/auth/index";
import styles from "styles/pages/auth.module.scss";

interface PanelProps {
    setForm: React.Dispatch<React.SetStateAction<FormType>>;
}

export const RightPanel: React.FC<PanelProps> = (props) => {
    return (
        <div
            className={`${styles["overlay-panel"]} ${styles["overlay-right"]}`}
        >
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
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
        <div className={`${styles["overlay-panel"]} ${styles["overlay-left"]}`}>
            <h1>Welcome Back!</h1>
            <p>
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
