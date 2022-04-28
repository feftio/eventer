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
        case "INIT_AUTH_STATE":
            return { ...state, ...action.state };
        case "REGISTER_USER":
            return { ...state };
        case "LOGIN_USER":
            return {
                ...state,
                username: action.username,
                token: action.token,
                authenticated: true,
            };
        case "LOGOUT_USER":
            return {
                ...state,
                ...initialAuthState,
            };
        default:
            return state;
    }
};

export default authReducer;
