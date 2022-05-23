import { instance } from "src/services";

export const eventService = {
    create(formData: FormData) {
        return instance.post("event/create", formData, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });
    },
};
