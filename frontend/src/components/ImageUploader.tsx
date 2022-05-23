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

const ImageUploader: React.FC<ImageUploaderProps> = ({ image, setImage }) => {
    return (
        <Stack direction="column" gap={1.5}>
            <label htmlFor="image">
                <Input
                    id="image"
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                        if (e.target.files[0] === undefined) {
                            setImage(null);
                            return;
                        }
                        setImage(e.target.files[0]);
                    }}
                />
                <Button
                    variant="outlined"
                    endIcon={<PhotoCamera />}
                    component="span"
                >
                    Upload
                </Button>
            </label>
            {image !== null ? (
                <img
                    src={URL.createObjectURL(image)}
                    width="200px"
                    height="auto"
                    alt="Image"
                />
            ) : null}
        </Stack>
    );
};

export default ImageUploader;
