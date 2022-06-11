import { PhotoCamera } from "@mui/icons-material";
import { Button, Stack, styled } from "@mui/material";
import React from "react";

const Input = styled("input")({
    display: "none",
});

type ImageUploaderProps = {
    image: File | null;
    setImage: React.Dispatch<React.SetStateAction<File | null>>;
};

const ImageUploader: React.FC<ImageUploaderProps> = (props) => {
    return (
        <Stack direction="column" gap={1.5} sx={{ width: "100%", mb: "25px" }}>
            <label htmlFor="image">
                <Input
                    id="image"
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                        if (e.target.files[0] === undefined) {
                            props.setImage(null);
                            return;
                        }
                        props.setImage(e.target.files[0]);
                    }}
                />
                <Button fullWidth variant="outlined" component="span">
                    <PhotoCamera />
                </Button>
            </label>
            {props.image !== null ? (
                <img
                    src={URL.createObjectURL(props.image)}
                    alt="Image"
                    style={{
                        width: "100%",
                        height: "100%",
                        marginTop: "25px",
                    }}
                />
            ) : null}
        </Stack>
    );
};

export default ImageUploader;
