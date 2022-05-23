import { ActionType } from "src/redux";

const initialUserState = {
    id: null as string | null,
    username: null as string | null,
    token: null as string | null,
    authenticated: false as boolean,
    firstName: null as string | null,
    lastName: null as string | null,
    email: null as string | null,
    phone: null as string | null,
};

export type UserStateType = typeof initialUserState;

const userReducer = (
    state = initialUserState,
    action: ActionType
): UserStateType => {
    switch (action.type) {
        case "USER/SET_USER_STATE":
            return { ...state, ...action.state };
        case "USER/REGISTER_USER":
            return { ...state };
        case "USER/LOGIN_USER":
            return {
                ...state,
                username: action.username,
                token: action.token,
                authenticated: true,
            };
        case "USER/LOGOUT_USER":
            return {
                ...state,
                ...initialUserState,
            };
        default:
            return state;
    }
};

export default userReducer;
