import React from "react";
import { Navigate } from "react-router-dom";
import { useRootSelector } from "src/redux";

const initialOptions = {
    redirectTo: "/auth" as string,
    whenAuth: false as boolean,
};

type OptionsType = typeof initialOptions;

const withAuthRedirect =
    (
        Component: React.ComponentType,
        options: Partial<OptionsType> = initialOptions
    ) =>
    ({ ...props }) => {
        const mergedOptions = { ...initialOptions, ...options };
        const authenticated = useRootSelector(
            (state) => state.user.authenticated
        );
        if (authenticated === mergedOptions.whenAuth)
            return <Navigate replace to={mergedOptions.redirectTo} />;
        return <Component {...props} />;
    };

export default withAuthRedirect;
