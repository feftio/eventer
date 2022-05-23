import {
    Button,
    FormControl,
    InputLabel,
    styled,
    TextField,
    Select,
    MenuItem,
    useTheme,
    OutlinedInput,
    Theme,
    Paper,
} from "@mui/material";
import React, { useState } from "react";
import ImageUploader from "src/components/ImageUploader";
import { eventService } from "src/services/event";
import WysiwygEditor from "src/components/wysiwyg-editor/WysiwygEditor";
import { CollectionsBookmarkOutlined } from "@mui/icons-material";

const tagsList: string[] = [
    "Opening",
    "Show",
    "Fair",
    "Presentation",
    "Holiday",
    "Master Class",
    "Training",
    "Seminar",
    "Festival",
    "Concert",
];

const Form = styled("form")({
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "start",
});

function getStyles(name: string, tags: string[], theme: Theme) {
    return {
        fontWeight:
            tags.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightBold,
    };
}

const CreateCabinetFragment: React.FC<{}> = () => {
    const editor = React.useRef<any>();
    const [name, setName] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [image, setImage] = useState<any>(null);

    const theme = useTheme();

    return (
        <>
            <Form
                onSubmit={async (e: any) => {
                    e.preventDefault();
                    const formData = new FormData();
                    formData.append("name", name);
                    formData.append(
                        "description",
                        JSON.stringify((await editor.current.save()).blocks)
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
                    if (image) formData.append("image", image, image.name);
                    eventService.create(formData);
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
                            setStartDate(e.target.value);
                        }}
                    />
                    <TextField
                        label="End Date"
                        type="datetime-local"
                        sx={{ width: "100%" }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e: any) => {
                            setEndDate(e.target.value);
                        }}
                    />
                    <FormControl sx={{ width: "100%" }}>
                        <InputLabel id="tags-label">Tags</InputLabel>
                        <Select
                            labelId="tags-label"
                            id="tags"
                            multiple
                            value={tags}
                            onChange={(e: any) => {
                                const {
                                    target: { value },
                                } = e;
                                setTags(
                                    typeof value === "string"
                                        ? value.split(",")
                                        : value
                                );
                            }}
                            input={<OutlinedInput label="Tagss" />}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 48 * 4.5 + 8,
                                        width: 250,
                                    },
                                },
                            }}
                        >
                            {tagsList.map((tag) => (
                                <MenuItem
                                    key={tag}
                                    value={tag}
                                    style={getStyles(tag, tags, theme)}
                                >
                                    {tag}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
