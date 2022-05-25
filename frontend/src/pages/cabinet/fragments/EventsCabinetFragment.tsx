import { Box, Button } from "@mui/material";
import React from "react";
import EventsTable from "src/components/EventsTable";
import { useNavigate } from "react-router-dom";

const EventsCabinetFragment: React.FC<{}> = () => {
    return (
        <Box
            component="div"
            sx={{ display: "flex", flexDirection: "column", p: "0px 10px" }}
        >
            <EventsTable />
        </Box>
    );
};

export default EventsCabinetFragment;
