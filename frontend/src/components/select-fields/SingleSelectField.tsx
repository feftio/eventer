import {
    FormControl,
    FormControlTypeMap,
    InputLabel,
    MenuItem,
    Select,
    SxProps,
    Theme,
} from "@mui/material";
import React from "react";

type SingleSelectFieldProps = {
    label: string;
    list: Array<string>;
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
    sx?: SxProps<Theme>;
};

const SingleSelectField: React.FC<SingleSelectFieldProps> = (props) => {
    return (
        <FormControl fullWidth sx={props.sx}>
            <InputLabel id={"single-select-label-" + props.label}>
                {props.label}
            </InputLabel>
            <Select
                labelId={"single-select-label-" + props.label}
                id={"single-select-id-" + props.label}
                value={props.state}
                label={props.label}
                onChange={(e: any) => {
                    props.setState(e.target.value as string);
                }}
            >
                {props.list.map((item) => (
                    <MenuItem key={item} value={item}>
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

SingleSelectField.defaultProps = {
    sx: {},
};

export default SingleSelectField;
