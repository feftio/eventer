import { authService } from "src/services/auth";
import { RootDispatch } from "src/redux";
import Swal from "src/swal";
import {
    loginUserAC,
    logoutUserAC,
    initAuthStateAC,
} from "src/redux/auth/action-creators";

export const login =
    (username: string, password: string) => (dispatch: RootDispatch) => {
        authService
            .login(username, password)
            .then((response) => {
                const { token } = response.data;
                localStorage.setItem("token", token);
                Swal.fire({
                    title: `Hello, ${username}`,
                    html: "It's your own cabinet...",
                    icon: "success",
                });
                dispatch(loginUserAC(token, username));
            })
            .catch((error) => {
                console.log(error);
            });
    };

export const register =
    (username: string, email: string, password: string) =>
    (dispatch: RootDispatch) => {
        return authService.register(username, email, password);
    };

export const logout = () => (dispatch: RootDispatch) => {
    localStorage.removeItem("token");
    dispatch(logoutUserAC());
};

export const initAuth = () => async (dispatch: RootDispatch) => {
    const token = localStorage.getItem("token");
    if (token !== null) {
        const response = await authService.identify(token);
        dispatch(
            initAuthStateAC({
                token,
                authenticated: true,
                username: response.data.username,
            })
        );
    } else {
        dispatch(
            initAuthStateAC({
                authenticated: false,
            })
        );
    }
};
