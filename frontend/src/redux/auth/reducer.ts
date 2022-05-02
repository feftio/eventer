import { ActionType } from "src/redux";

const initialAuthState = {
    username: null as string | null,
    token: null as string | null,
    successModal: false as boolean,
    authenticated: false as boolean,
};

export type AuthStateType = typeof initialAuthState;

const authReducer = (
    state = initialAuthState,
    action: ActionType
): AuthStateType => {
    switch (action.type) {
        case "AUTH/SET_AUTH_STATE":
            return { ...state, ...action.state };
        case "AUTH/REGISTER_USER":
            return { ...state };
        case "AUTH/LOGIN_USER":
            return {
                ...state,
                username: action.username,
                token: action.token,
                authenticated: true,
            };
        case "AUTH/LOGOUT_USER":
            return {
                ...state,
                ...initialAuthState,
            };
        default:
            return state;
    }
};

export default authReducer;
