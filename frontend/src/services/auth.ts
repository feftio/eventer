import { instance } from "src/services";

export const authService = {
    login(username: string, password: string) {
        return instance.get("user/login", {
            params: { username, password },
        });
    },
    register(username: string, email: string, password: string) {
        return instance.post("user/register", { username, email, password });
    },
    identify(token: string) {
        return instance.get("user/identify", {
            params: { token },
        });
    },
};
