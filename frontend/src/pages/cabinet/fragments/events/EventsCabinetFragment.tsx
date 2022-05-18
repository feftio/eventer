import { Box, Button, Container, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import EventsTable from "src/components/EventsTable";

const EventsCabinetFragment: React.FC<{}> = () => {
    return (
        <Box
            component="div"
            sx={{ display: "flex", flexDirection: "column", p: "0px 10px" }}
        >
            <EventsTable />
            <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ pl: 1, pr: 1, borderRadius: "0px 0px 4px 4px" }}
            >
                <AddIcon />
            </Button>
        </Box>
    );
};

export default EventsCabinetFragment;
