import { CircularProgress } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import WysiwygReader from "src/components/wysiwyg/WysiwygReader";
import { eventService } from "src/services/event";

const EventPage: React.FC<{}> = () => {
    const params = useParams();
    const [event, setEvent] = React.useState<any | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const getEventById = async () => await eventService.getById(params.id);
        getEventById()
            .then((response) => setEvent(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    if (loading)
        return (
            <div
                style={{
                    display: "flex",
                    width: "100vw",
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress size="50px" />
            </div>
        );
    if (event === null)
        return (
            <div
                style={{
                    display: "flex",
                    width: "100vw",
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                Event not found
            </div>
        );
    else
        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <header
                    style={{
                        position: "relative",
                        display: "block",
                        height: "630px",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            background: `url("${event.image}") center no-repeat`,
                            backgroundSize: "cover",
                            filter: "blur(3px)",
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.4)",
                            fontSize: 50,
                            fontWeight: "bold",
                            color: "white",
                        }}
                    >
                        <p>{event.name}</p>
                    </div>
                </header>
                <WysiwygReader value={event.description} />
            </div>
        );
};

export default EventPage;
