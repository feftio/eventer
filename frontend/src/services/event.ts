import { instance } from "src/services";

export const eventService = {
    create(formData: FormData) {
        return instance.post("event/create", formData, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });
    },
    getUserEvents() {
        return instance.get("event/user");
    },
    getById(id: string) {
        return instance.get("event/get", { params: { id } });
    },
};
