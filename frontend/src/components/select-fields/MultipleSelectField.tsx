import {
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SxProps,
    Theme,
    useTheme,
} from "@mui/material";
import React from "react";

function getStyles(item: string, state: string[], theme: Theme) {
    return {
        fontWeight:
            state.indexOf(item) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightBold,
    };
}

type MultipleSelectFieldProps = {
    label: string;
    list: Array<string>;
    state: Array<string>;
    setState: React.Dispatch<React.SetStateAction<Array<string>>>;
    sx?: SxProps<Theme>;
};

const MultipleSelectField: React.FC<MultipleSelectFieldProps> = (props) => {
    const theme = useTheme();

    return (
        <FormControl fullWidth sx={props.sx}>
            <InputLabel id={"multiple-select-label-" + props.label}>
                {props.label}
            </InputLabel>
            <Select
                labelId={"multiple-select-label-" + props.label}
                id={"multiple-select-id-" + props.label}
                multiple
                value={props.state}
                onChange={(e: any) => {
                    props.setState(
                        typeof e.target.value === "string"
                            ? e.target.value.split(",")
                            : e.target.value
                    );
                }}
                input={<OutlinedInput label={props.label} />}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 48 * 4.5 + 8,
                            width: 250,
                        },
                    },
                }}
            >
                {props.list.map((item) => (
                    <MenuItem
                        key={item}
                        value={item}
                        style={getStyles(item, props.state, theme)}
                    >
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

MultipleSelectField.defaultProps = {
    sx: {}
}

export default MultipleSelectField;
