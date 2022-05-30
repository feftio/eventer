import React from "react";
import classes from "./DateNote.module.scss";
import DateIcon from "@mui/icons-material/DateRange";

type DateNoteProps = {
    startDate: string | null;
    endDate: string | null;
};

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const DateNote: React.FC<DateNoteProps> = (props) => {
    const startDate =
        props.startDate !== null ? new Date(props.startDate) : null;
    const endDate = props.endDate !== null ? new Date(props.endDate) : null;

    return (
        <div className={classes["container"]}>
            <DateIcon />
            {startDate !== null && (
                <>
                    <p>{startDate.getDate()}</p>
                    <p>{months[startDate.getMonth()].substring(0, 3)}</p>
                    <p>{startDate.getFullYear()}</p>
                </>
            )}
            {endDate !== null && (
                <>
                    <p>{"- " + endDate.getDate()}</p>
                    <p>{months[endDate.getMonth()].substring(0, 3)}</p>
                    <p>{endDate.getFullYear()}</p>
                </>
            )}
        </div>
    );
};

export default DateNote;
