import { instance } from "src/services";

export type EventType = {
    id: string;
    name: string;
    image: string | null;
    created_at: string;
    start_date: string;
    end_date: string;
    liked: Array<string>;
    description: object;
    tags: Array<string>;
    city: string;
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
        return instance.get<EventType>("event/get", { params: { id } });
    },
    delete(id: string) {
        return instance.delete(`event/delete/${id}`);
    },
    getCities() {
        return instance
            .get("event/special/cities")
            .then((response) => response.data);
    },
    getTags() {
        return instance
            .get("event/special/tags")
            .then((response) => response.data);
    },
    register(id: string, name: string, email: string, contacts: string) {
        return instance.patch(`event/register/${id}`, {
            name,
            email,
            contacts,
        });
    },
};
