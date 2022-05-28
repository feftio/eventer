import { instance } from "src/services";

type EventResponseType = {
    id: string;
    [key: string]: any
};

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
        return instance.get<EventResponseType>("event/get", { params: { id } });
    },
    delete(id: string) {
        return instance.patch(`event/change/${id}`, { active: false });
    },
};
