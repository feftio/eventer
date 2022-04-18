import { ActionType } from "src/store/actions";
import * as actionTypes from "src/store/actions/types";

const initialState = {
    username: null as string | null,
    password: null as string | null,
    isAuth: false as boolean,
};

type InitialStateType = typeof initialState;

const authReducer = (
    state = initialState,
    action: ActionType
): InitialStateType => {
    switch (action.type) {
        case actionTypes.REGISTER_USER:
        case actionTypes.LOGIN_USER:
        default:
            return state;
    }
};

export default authReducer;
