import { instance } from "src/services";

export const authService = {
    register(username: string, email: string, password: string) {
        return instance.post("user/register", { username, email, password });
    },
};
