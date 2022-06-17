import { instance } from "src/services";

export const userService = {
    login(username: string, password: string) {
        return instance.post("user/login", { username, password });
    },
    register(username: string, email: string, password: string) {
        return instance.post("user/register", { username, email, password });
    },
    identify(token: string) {
        return instance.get(`user/identify/${token}`);
    },
    getEditorValue() {
        return instance.get("user/editor");
    },
    changeEditorValue(value: object) {
        return instance.post("user/editor", { value });
    },
};
