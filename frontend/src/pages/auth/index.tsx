import React, { useState } from "react";
import { LeftPanel, RightPanel } from "./panels";
import { LoginForm, RegistrationForm } from "./forms";
import classNames from "classnames";
import classes from "src/pages/auth/style.module.scss";
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
            <div
                className={classNames({
                    [classes["auth-container"]]: true,
                    [classes["right-panel-active"]]:
                        form === FormType.Registration,
                })}
            >
                <RegistrationForm />
                <LoginForm />
                <div className={classes["overlay-container"]}>
                    <div className={classes["overlay"]}>
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
