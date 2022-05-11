import React, { useState } from "react";
import { LeftPanel, RightPanel } from "./panels";
import { LoginForm, RegistrationForm } from "./forms";
import classNames from "classnames";
import styles from "styles/pages/auth.module.scss";
import bg from "src/assets/images/auth-bg.jpg";
import withAuthRedirect from "src/hoc/withAuthRedirect";

export enum FormType {
    Login,
    Registration,
}

const AuthPage: React.FC<{}> = () => {
    const [form, setForm] = useState<FormType>(FormType.Login);
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
            {/* <NavLink
                to="/"
                style={{
                    position: "absolute",
                    display: "block",
                    left: "50%",
                    transform: "translate(-50%, 100%)",
                }}
            ><img src={home} width="50" height="50" /></NavLink> */}
            <div
                className={classNames({
                    [styles["auth-container"]]: true,
                    [styles["right-panel-active"]]:
                        form === FormType.Registration,
                })}
            >
                <RegistrationForm />
                <LoginForm />
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

export default withAuthRedirect(AuthPage, {
    whenAuth: true,
    redirectTo: "/cabinet",
});
