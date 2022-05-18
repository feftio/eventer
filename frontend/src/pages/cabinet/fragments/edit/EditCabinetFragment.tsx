import { Google, PhotoCamera } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import {
    Box,
    Button,
    FormGroup,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    IconButton,
    InputLabel,
    Radio,
    RadioGroup,
    Stack,
    styled,
    TextField,
    Checkbox,
} from "@mui/material";
import React, { useState } from "react";
import ImageUploader from "src/components/ImageUploader";
import { eventService } from "src/services/event";

const Form = styled("form")({
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "start",
});

const EditCabinetFragment: React.FC<{}> = () => {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [image, setImage] = useState<any>(null);

    return (
        <>
            <div
                style={{
                    position: "fixed",
                    display: "block",
                    right: 30,
                    padding: "50px",
                    backgroundColor: "#f3f3f3",
                    zIndex: 100,
                }}
            >
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Label"
                    />
                    <FormControlLabel
                        disabled
                        control={<Checkbox />}
                        label="Disabled"
                    />
                </FormGroup>
            </div>
            <Form
                onSubmit={(e: any) => {
                    e.preventDefault();
                    console.dir(e);
                }}
            >
                <TextField
                    label="Multiline"
                    multiline
                    maxRows={4}
                    //   value={value}
                    //   onChange={handleChange}
                    variant="filled"
                    sx={{
                        width: "100%",
                    }}
                />
                <TextField
                    label="Start Date"
                    type="datetime-local"
                    sx={{ width: "100%" }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e: any) => {
                        setStartDate(new Date(e.target.value));
                    }}
                />
                <TextField
                    label="End Date"
                    type="datetime-local"
                    sx={{ width: "100%", height: "1000px" }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e: any) => {
                        setEndDate(new Date(e.target.value));
                    }}
                />
                <ImageUploader image={image} setImage={setImage} />
                <Button variant="contained" type="submit">
                    Save
                </Button>
            </Form>
        </>
    );
};

export default EditCabinetFragment;
