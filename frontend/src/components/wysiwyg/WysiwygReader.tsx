import React from "react";
import { createReactEditorJS } from "react-editor-js";
import { Paper } from "@mui/material";
import tools from "./tools";

const ReactEditorJS = createReactEditorJS();

const WysiwygReader: React.FC<{ value: object }> = (props) => {
    return (
        <Paper
            style={{
                display: "block",
                width: "100%",
                padding: "25px",
            }}
        >
            <ReactEditorJS tools={tools()} defaultValue={props.value} />
        </Paper>
    );
};

export default WysiwygReader;
