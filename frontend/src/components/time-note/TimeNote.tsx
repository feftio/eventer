import React from "react";
import classes from "./TimeNote.module.scss";
import TimeIcon from "@mui/icons-material/AccessTimeFilled";

type TimeNoteProps = {
    startDate: string | null;
    endDate: string | null;
};

const getMinutes = (date: Date) => {
    if (date.getMinutes() === 0) return "00";
    return String(date.getMinutes());
};

const getHours = (date: Date) => {
    if (date.getHours() === 0) return "00";
    return String(date.getHours());
};

const TimeNote: React.FC<TimeNoteProps> = (props) => {
    const startDate =
        props.startDate !== null ? new Date(props.startDate) : null;
    const endDate = props.endDate !== null ? new Date(props.endDate) : null;

    return (
        <div className={classes["container"]}>
            <TimeIcon />
            {startDate !== null && (
                <p>{getHours(startDate) + ":" + getMinutes(startDate)}</p>
            )}
            {endDate !== null && (
                <p>{"- " + getHours(endDate) + ":" + getMinutes(endDate)}</p>
            )}
        </div>
    );
};

export default TimeNote;
