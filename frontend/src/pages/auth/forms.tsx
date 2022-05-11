import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import styles from "styles/pages/auth.module.scss";
import { userService } from "src/services/user";
import { login } from "src/redux/user/functions";
import { useRootDispatch } from "src/redux";

export const LoginForm: React.FC<any> = (props) => {
    const dispatch = useRootDispatch();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
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
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    type="password"
                    label="Password"
                    variant="outlined"
                    margin="dense"
                    size="medium"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <a href="#">Forgot your password?</a>
                <Button
                    variant="contained"
                    sx={{ width: "100%" }}
                    onClick={(e) => {
                        dispatch(login(username, password));
                        setPassword("");
                    }}
                >
                    Login
                </Button>
            </form>
        </div>
    );
};

export const RegistrationForm: React.FC<{}> = () => {
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
                        userService
                            .register(username, email, password)
                            .then((response) => {
                                console.dir(response);
                            });
                    }}
                >
                    Register
                </Button>
            </form>
        </div>
    );
};
