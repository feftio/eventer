import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableCellProps,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Box,
    CircularProgress,
} from "@mui/material";
import React from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useRootSelector } from "src/redux";
import { eventService } from "src/services/event";
import { useNavigate } from "react-router-dom";
import { DeleteEventSwal } from "src/swal/event";

function createColumn(name: string, align: TableCellProps["align"] = "left") {
    return { name, align };
}

const columns = [
    createColumn("Name", "left"),
    createColumn("Date", "center"),
    createColumn("Registered", "center"),
    createColumn("Watched", "center"),
    createColumn("City", "center"),
    createColumn("Edit", "center"),
    createColumn("Delete", "center"),
];

const EventsTable: React.FC<{}> = () => {
    const navigate = useNavigate();
    const [events, setEvents] = React.useState<any | null>(null);
    const [change, setChange] = React.useState<boolean>(true);
    React.useEffect(() => {
        if (change !== true) return;
        eventService.getUserEvents().then((response) => {
            setEvents(response.data);
        });
        setChange(false);
    }, [change]);

    if (events === null)
        return (
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                }}
            >
                <div style={{ display: "block", padding: 50 }}>
                    <CircularProgress />
                </div>
            </div>
        );
    return (
        <Box component="div" sx={{ display: "flex", flexDirection: "column" }}>
            <TableContainer
                component={Paper}
                sx={{ borderRadius: "4px 4px 0px 0px" }}
            >
                <Table stickyHeader sx={{ minWidth: 500 }} size="small">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.name}
                                    sx={{ fontWeight: "bold" }}
                                    align={column.align}
                                >
                                    {column.name}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map((event) => (
                            <TableRow
                                key={event.name}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                                hover
                            >
                                <TableCell align="left">
                                    <Button
                                        variant="text"
                                        onClick={() => {
                                            navigate(`/event/${event.id}`);
                                        }}
                                    >
                                        {event.name}
                                    </Button>
                                </TableCell>
                                <TableCell align="center">
                                    {event.start_date}
                                </TableCell>
                                <TableCell align="center">
                                    {event.registered.length}
                                </TableCell>
                                <TableCell align="center">
                                    {event.watched}
                                </TableCell>
                                <TableCell align="center">
                                    {event.city}
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        size="large"
                                        onClick={() => {
                                            console.dir(event.name);
                                        }}
                                        color="primary"
                                    >
                                        <EditOutlinedIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        size="large"
                                        onClick={() => {
                                            DeleteEventSwal(() => {
                                                eventService
                                                    .delete(event.id)
                                                    .then((response) => {
                                                        setChange(true);
                                                    });
                                            });
                                        }}
                                        color="error"
                                    >
                                        <DeleteForeverOutlinedIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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

export default EventsTable;
