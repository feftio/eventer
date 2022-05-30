import { Button, styled, TextField, Paper } from "@mui/material";
import React from "react";
import ImageUploader from "src/components/ImageUploader";
import { eventService } from "src/services/event";
import WysiwygEditor from "src/components/wysiwyg/WysiwygEditor";
import { ErrorEventCreateSwal, SuccessEventCreateSwal } from "src/swal/event";
import { useNavigate } from "react-router-dom";
import MultipleSelectField from "src/components/select-fields/MultipleSelectField";
import SingleSelectField from "src/components/select-fields/SingleSelectField";

// const tagsList: string[] = [
//     "Opening",
//     "Show",
//     "Fair",
//     "Presentation",
//     "Holiday",
//     "Master Class",
//     "Training",
//     "Seminar",
//     "Festival",
//     "Concert",
// ];

// const citiesList: string[] = ["Almaty", "Astana"];

const Form = styled("form")({
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "start",
});

const CreateCabinetFragment: React.FC<{}> = () => {
    const navigate = useNavigate();
    const editor = React.useRef<any>();
    const [name, setName] = React.useState<string>("");
    const [startDate, setStartDate] = React.useState<string>("");
    const [endDate, setEndDate] = React.useState<string>("");
    const [tags, setTags] = React.useState<string[]>([]);
    const [city, setCity] = React.useState<string>("");
    const [image, setImage] = React.useState<any>(null);

    const [tagsList, setTagsList] = React.useState<string[]>([]);
    const [citiesList, setCitisList] = React.useState<string[]>([]);

    React.useEffect(() => {
        eventService.getTags().then((data) => setTagsList(data));
        eventService.getCities().then((data) => setCitisList(data));
    }, []);

    return (
        <>
            <Form
                onSubmit={async (e: any) => {
                    e.preventDefault();
                    const formData = new FormData();
                    formData.append("name", name);
                    formData.append(
                        "description",
                        JSON.stringify(await editor.current.save())
                    );
                    if (startDate !== "")
                        formData.append(
                            "start_date",
                            (new Date(startDate).getTime() / 1000).toString()
                        );
                    if (endDate !== "")
                        formData.append(
                            "end_date",
                            (new Date(endDate).getTime() / 1000).toString()
                        );
                    formData.append("tags", JSON.stringify(tags));

                    if (city !== "") formData.append("city", city);
                    if (image) formData.append("image", image, image.name);
                    eventService.create(formData).then(
                        (response) => {
                            SuccessEventCreateSwal();
                            navigate("/cabinet/events");
                        },
                        (error) => {
                            ErrorEventCreateSwal();
                        }
                    );
                }}
            >
                <WysiwygEditor editor={editor} />
                <Paper
                    style={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        alignItems: "flex-start",
                        padding: "40px",
                        marginLeft: "30px",
                    }}
                >
                    <TextField
                        label="Name"
                        variant="filled"
                        value={name}
                        onChange={(e: any) => {
                            setName(e.target.value);
                        }}
                        sx={{
                            width: "100%",
                            mb: "25px",
                        }}
                    />

                    <TextField
                        label="Start Date"
                        type="datetime-local"
                        sx={{ width: "100%", mb: "25px" }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e: any) => {
                            setStartDate(e.target.value);
                        }}
                    />
                    <TextField
                        label="End Date"
                        type="datetime-local"
                        sx={{ width: "100%", mb: "25px" }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e: any) => {
                            setEndDate(e.target.value);
                        }}
                    />
                    <MultipleSelectField
                        label="Tags"
                        state={tags}
                        setState={setTags}
                        list={tagsList}
                        sx={{ mb: "25px" }}
                    />
                    <SingleSelectField
                        label="City"
                        state={city}
                        setState={setCity}
                        list={citiesList}
                        sx={{ mb: "25px" }}
                    />
                    <ImageUploader
                        image={image}
                        setImage={(file: File) => setImage(file)}
                    />
                    <Button variant="contained" type="submit" fullWidth>
                        Create
                    </Button>
                </Paper>
            </Form>
        </>
    );
};

export default CreateCabinetFragment;
