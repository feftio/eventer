import React from "react";
import classes from "./CityNote.module.scss";
import CityIcon from "@mui/icons-material/LocationCity";

type CityNoteProps = {
    city: string;
};

const CityNote: React.FC<CityNoteProps> = (props) => {
    return (
        <div className={classes["container"]}>
            <CityIcon />
            <p>{props.city}</p>
        </div>
    );
};

export default CityNote;
