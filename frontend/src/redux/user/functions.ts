import { userService } from "src/services/user";
import { RootDispatch } from "src/redux";
import Swal from "src/swal";
import {
    loginUserAC,
    logoutUserAC,
    setUserStateAC,
} from "src/redux/user/action-creators";

export const login =
    (username: string, password: string) => (dispatch: RootDispatch) => {
        userService
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
                dispatch(restoreUser());
            })
            .catch((error) => {
                Swal.fire({
                    title: "Wrong!",
                    text: "Wrong username or password",
                    icon: "error",
                    confirmButtonText: "Cool",
                });
            });
    };

export const register =
    (username: string, email: string, password: string) =>
    (dispatch: RootDispatch) => {
        return userService.register(username, email, password);
    };

export const logout = () => (dispatch: RootDispatch) => {
    localStorage.removeItem("token");
    dispatch(logoutUserAC());
};

export const restoreUser = () => (dispatch: RootDispatch) => {
    const token = localStorage.getItem("token");
    if (token !== null) {
        dispatch(
            setUserStateAC({
                token,
                authenticated: true,
            })
        );
        userService.identify(token).then(
            (response) => {
                dispatch(
                    setUserStateAC({
                        id: response.data.id,
                        username: response.data.username,
                        email: response.data.email,
                        firstName: response.data.first_name,
                        lastName: response.data.last_name,
                    })
                );
            },
            (error) => {
                dispatch(logout());
            }
        );
    }
};
