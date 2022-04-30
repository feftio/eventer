import React, { useEffect, useState } from "react";
import { useRootDispatch, useRootSelector } from "src/redux";
import { logout } from "src/redux/auth/functions";
import Swal from "src/swal";

const HomePage: React.FC<{}> = () => {
    const dispatch = useRootDispatch();
    const authenticated = useRootSelector((state) => state.auth.authenticated);
    if (authenticated)
        return (
            <>
                <div>HomePage: Authenticated</div>
                <button
                    onClick={() => {
                        dispatch(logout());
                    }}
                >
                    Logout
                </button>
            </>
        );
    return <button onClick={() => {}}>HomePage</button>;
};

export default HomePage;
