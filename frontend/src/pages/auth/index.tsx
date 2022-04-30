import React, { useState } from "react";
import { LeftPanel, RightPanel } from "./panels";
import { SignInForm, SignUpForm } from "./forms";
import classNames from "classnames";
import styles from "styles/pages/auth.module.scss";
import bg from "src/assets/images/auth-bg.jpg";
import { useRootSelector } from "src/redux";
import { Navigate } from "react-router-dom";

export enum FormType {
    SignIn,
    SignUp,
}

const AuthPage: React.FC<{}> = () => {
    const authenticated = useRootSelector((state) => state.auth.authenticated);
    const successModal = useRootSelector((state) => state.auth.successModal);
    const [form, setForm] = useState<FormType>(FormType.SignIn);

    if (authenticated) return <Navigate replace to="/" />;
    return (
        <>
            <div
                style={{
                    background: `url(${bg})`,
                    position: "absolute",
                    backgroundPosition: "center center",
                    height: "100%",
                    width: "100%",
                    top: "0",
                }}
            />
            <div
                className={classNames({
                    [styles["auth-container"]]: true,
                    [styles["right-panel-active"]]: form === FormType.SignUp,
                })}
            >
                <SignUpForm />
                <SignInForm />
                <div className={styles["overlay-container"]}>
                    <div className={styles["overlay"]}>
                        <LeftPanel setForm={setForm} />
                        <RightPanel setForm={setForm} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthPage;
