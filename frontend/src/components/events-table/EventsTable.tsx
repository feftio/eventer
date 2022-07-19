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
    Modal,
} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Visibility";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { eventService } from "src/services/event";
import { useNavigate } from "react-router-dom";
import { DeleteEventSwal } from "src/swal/event";
import classes from "./EventsTable.module.scss";

function createColumn(name: string, align: TableCellProps["align"] = "left") {
    return { name, align };
}

const columns = [
    createColumn("Name", "left"),
    createColumn("Date", "center"),
    createColumn("Registered", "center"),
    createColumn("Watched", "center"),
    createColumn("City", "center"),
    createColumn("Check", "center"),
    createColumn("Delete", "center"),
];

const EventsTable: React.FC<{}> = () => {
    const navigate = useNavigate();
    const [checkIndex, setCheckIndex] = React.useState<number | null>(null);
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
                        {events.map((event, index) => (
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
                                            setCheckIndex(index);
                                        }}
                                        color="primary"
                                        disabled={event.registered == 0}
                                    >
                                        <CheckIcon />
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
            <Modal
                open={checkIndex !== null ? true : false}
                onClose={() => setCheckIndex(null)}
            >
                <Box
                    sx={{
                        position: "absolute" as "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        minWidth: 400,
                        maxHeight: 500,
                        bgcolor: "background.paper",
                        borderRadius: "5px",
                        boxShadow: 24,
                        p: 4,
                        overflowY: "auto",
                    }}
                >
                    {checkIndex !== null && (
                        <>
                            <Paper component="h2" sx={{ textAlign: "center" }}>
                                {events[checkIndex].name}
                            </Paper>
                            {events[checkIndex].registered.map(
                                (credentials: any, index) => (
                                    <Paper
                                        key={index}
                                        sx={{ textAlign: "left", mt: 2, p: 2 }}
                                    >
                                        <p>Id: {index + 1}</p>
                                        <p>Name: {credentials["name"]}</p>
                                        <p>Email: {credentials["email"]}</p>
                                        <p>
                                            Contacts: {credentials["contacts"]}
                                        </p>
                                    </Paper>
                                )
                            )}
                        </>
                    )}
                </Box>
            </Modal>
        </Box>
    );
};

export default EventsTable;
