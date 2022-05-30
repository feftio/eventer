import { CircularProgress } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import WysiwygReader from "src/components/wysiwyg/WysiwygReader";
import { eventService, EventType } from "src/services/event";
import classes from "src/pages/event/style.module.scss";
import DateNote from "src/components/date-note/DateNote";
import TimeNote from "src/components/time-note/TimeNote";
import CityNote from "src/components/city-note/CityNote";
import EventRegistrationDialog from "src/components/dialog/event-registration/EventRegistrationDialog";
import TagsNote from "src/components/tags-note/TagsNote";

const EventPage: React.FC<{}> = () => {
    const params = useParams();
    const [event, setEvent] = React.useState<EventType | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        eventService
            .getById(params.id)
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
                <header className={classes["header"]}>
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
                    <div className={classes["header-container"]}>
                        <p className={classes["event-name"]}>{event.name}</p>
                        <div className={classes["notes-container"]}>
                            <DateNote
                                startDate={event.start_date}
                                endDate={event.end_date}
                            />
                            <TimeNote
                                startDate={event.start_date}
                                endDate={event.end_date}
                            />
                            <CityNote city={event.city} />
                            <TagsNote tags={event.tags} />
                        </div>
                    </div>
                </header>
                <EventRegistrationDialog id={event.id} />
                <WysiwygReader value={event.description} />
            </div>
        );
};

export default EventPage;
