import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import styles from "styles/pages/auth.module.scss";
import { authService } from "src/services/auth";
import { RecordWithTtl } from "dns";

export const SignInForm: React.FC<{}> = () => {
    return (
        <div
            className={`${styles["form-container"]} ${styles["sign-in-container"]}`}
        >
            <form action="#">
                <h1>Sign in</h1>
                <div className={styles["social-container"]}>
                    <a href="#" className="social">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="social">
                        <i className="fab fa-google-plus-g"></i>
                    </a>
                    <a href="#" className="social">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
                <span>or use your account</span>
                <TextField
                    type="text"
                    label="Username"
                    variant="outlined"
                    margin="dense"
                    size="medium"
                    fullWidth
                />
                <TextField
                    type="password"
                    label="Password"
                    variant="outlined"
                    margin="dense"
                    size="medium"
                    fullWidth
                />
                <a href="#">Forgot your password?</a>
                <Button variant="contained" sx={{ width: "100%" }}>
                    Sign In
                </Button>
            </form>
        </div>
    );
};

export const SignUpForm: React.FC<{}> = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <div
            className={`${styles["form-container"]} ${styles["sign-up-container"]}`}
        >
            <form action="#">
                <h1>Create Account</h1>
                <div className={styles["social-container"]}>
                    <a href="#" className="social">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="social">
                        <i className="fab fa-google-plus-g"></i>
                    </a>
                    <a href="#" className="social">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
                <span>or use your email for registration</span>
                <TextField
                    type="text"
                    label="Username"
                    variant="outlined"
                    margin="dense"
                    size="small"
                    fullWidth
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <TextField
                    type="email"
                    label="Email"
                    variant="outlined"
                    margin="dense"
                    size="small"
                    fullWidth
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <TextField
                    type="password"
                    label="Password"
                    variant="outlined"
                    margin="dense"
                    size="small"
                    fullWidth
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <Button
                    variant="contained"
                    sx={{ width: "100%", marginTop: "10px" }}
                    onClick={(e) => {
                        console.log(
                            authService.register(username, email, password)
                        );
                    }}
                >
                    Sign Up
                </Button>
            </form>
        </div>
    );
};
