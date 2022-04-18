import { authService } from "src/services/auth";

export const register =
    (username: string, email: string, password: string) => (dispatch) => {
        return authService.register(username, email, password);
    };
