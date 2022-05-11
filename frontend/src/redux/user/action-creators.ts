import { UserStateType } from "src/redux/user/reducer";

export const setUserStateAC = (state: Partial<UserStateType>) => ({
    type: "USER/SET_USER_STATE" as const,
    state,
});

export const loginUserAC = (token: string, username: string) => ({
    type: "USER/LOGIN_USER" as const,
    token,
    username,
});

export const registerUserAC = () => ({
    type: "USER/REGISTER_USER" as const,
});

export const logoutUserAC = () => ({
    type: "USER/LOGOUT_USER" as const,
});
