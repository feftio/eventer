import { instance } from "src/services";

export const eventService = {
    create(form_data: any) {
        return instance.post("event/create", form_data, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });
    },
    register(username: string, email: string, password: string) {
        return instance.post("user/register", { username, email, password });
    },
};
