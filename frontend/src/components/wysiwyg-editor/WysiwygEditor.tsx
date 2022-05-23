import React, { ForwardedRef } from "react";
import { createReactEditorJS } from "react-editor-js";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import ImageGallery from "@rodrigoodhin/editorjs-image-gallery";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";
import defaultValue from "./defaultValue";
import { Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { useRootSelector } from "src/redux";

const ReactEditorJS = createReactEditorJS();

const tools = (id: string) => ({
    embed: Embed,
    table: Table,
    marker: Marker,
    list: List,
    warning: Warning,
    code: Code,
    linkTool: LinkTool,
    raw: Raw,
    header: Header,
    quote: Quote,
    image: {
        class: Image,
        config: {
            endpoints: {
                byFile: `http://localhost:8000/api/v1/event/load_description_image?user_id=${id}`, // Your backend file uploader endpoint
                byUrl: "http://localhost:8000/media/", // Your endpoint that provides uploading by Url
            },
        },
    },
    imageGallery: ImageGallery,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    simpleImage: SimpleImage,
});

const WysiwygEditor = (props) => {
    const id = useRootSelector((state) => state.user.id);
    const handleInitialize = (instance) => {
        props.editor.current = instance;
    };

    return (
        id && (
            <Paper
                style={{
                    display: "block",
                    width: "100%",
                    paddingLeft: "40px",
                }}
            >
                <ReactEditorJS
                    tools={tools(id)}
                    defaultValue={defaultValue}
                    onInitialize={handleInitialize}
                />
            </Paper>
        )
    );
};

export default WysiwygEditor;
