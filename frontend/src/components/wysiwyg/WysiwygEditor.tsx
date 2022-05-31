import React from "react";
import { createReactEditorJS } from "react-editor-js";
import defaultValue from "./defaultValue";
import { Paper } from "@mui/material";
import { useRootSelector } from "src/redux";
import tools from "./tools";

const ReactEditorJS = createReactEditorJS();

type WysiwygEditorProps = {
    value?: object;
    editor?: any;
};

const WysiwygEditor: React.FC<any> = (props) => {
    const id = useRootSelector((state) => state.user.id);
    const handleInitialize = (instance) => {
        if (props.editor !== null) props.editor.current = instance;
    };

    return (
        (id && props.value) && (
            <Paper
                style={{
                    display: "block",
                    width: "100%",
                    padding: "25px",
                }}
            >
                <ReactEditorJS
                    tools={tools(id)}
                    defaultValue={props.value}
                    onInitialize={handleInitialize}
                />
            </Paper>
        )
    );
};

WysiwygEditor.defaultProps = {
    value: defaultValue,
    editor: null,
};

export default WysiwygEditor;
