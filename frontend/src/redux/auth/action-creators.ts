import { AuthStateType } from "src/redux/auth/reducer";

export const initAuthStateAC = (state: Partial<AuthStateType>) => ({
    type: "INIT_AUTH_STATE" as const,
    state,
});

export const loginUserAC = (token: string, username: string) => ({
    type: "LOGIN_USER" as const,
    token,
    username,
});

export const registerUserAC = () => ({
    type: "REGISTER_USER" as const,
});

export const logoutUserAC = () => ({
    type: "LOGOUT_USER" as const,
});
