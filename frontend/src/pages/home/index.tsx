import React from "react";
import { useRootDispatch, useRootSelector } from "src/redux";
import { logout } from "src/redux/user/thunks";

const HomePage: React.FC<{}> = () => {
    const dispatch = useRootDispatch();
    const authenticated = useRootSelector((state) => state.user.authenticated);
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
