import { AuthStateType } from "src/redux/auth/reducer";

export const setAuthStateAC = (state: Partial<AuthStateType>) => ({
    type: "AUTH/SET_AUTH_STATE" as const,
    state,
});

export const loginUserAC = (token: string, username: string) => ({
    type: "AUTH/LOGIN_USER" as const,
    token,
    username,
});

export const registerUserAC = () => ({
    type: "AUTH/REGISTER_USER" as const,
});

export const logoutUserAC = () => ({
    type: "AUTH/LOGOUT_USER" as const,
});
