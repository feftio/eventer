import { Button } from "@mui/material";
import React from "react";
import WysiwygEditor from "src/components/wysiwyg/WysiwygEditor";
import { userService } from "src/services/user";
import {
    ErrorSaveEditorSettingSwal,
    SuccessSaveEditorSettingSwal,
} from "src/swal/event";

const SettingsCabinetFragment: React.FC<{}> = () => {
    const editor = React.useRef<any>();
    const [editorValue, setEditorValue] = React.useState<object | null>(null);

    React.useEffect(() => {
        userService.getEditorValue().then((response) => {
            setEditorValue(response.data);
        });
    }, []);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <WysiwygEditor editor={editor} value={editorValue} />
            <Button
                fullWidth
                variant="contained"
                onClick={async () => {
                    userService
                        .changeEditorValue(await editor.current.save())
                        .then(
                            (response) => {
                                SuccessSaveEditorSettingSwal();
                            },
                            (error) => {
                                ErrorSaveEditorSettingSwal();
                            }
                        );
                }}
            >
                Save
            </Button>
        </div>
    );
};

export default SettingsCabinetFragment;
