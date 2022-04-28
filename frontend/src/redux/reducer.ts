import { combineReducers } from "redux";
import authReducer from "src/redux/auth/reducer";

export default combineReducers({
    auth: authReducer,
});
