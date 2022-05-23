import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import EventsTable from "src/components/EventsTable";
import { useNavigate } from "react-router-dom";

const EventsCabinetFragment: React.FC<{}> = () => {
    const navigate = useNavigate();
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
                onClick={() => {
                    navigate("/cabinet/create");
                }}
            >
                <AddIcon />
            </Button>
        </Box>
    );
};

export default EventsCabinetFragment;
