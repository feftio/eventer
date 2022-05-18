import {
    Button,
    Paper,
    SxProps,
    Table,
    TableBody,
    TableCell,
    TableCellProps,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
} from "@mui/material";
import React from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useRootSelector } from "src/redux";

function createRow(
    name: string,
    date: string,
    registrated: number,
    watched: number,
    city: string
) {
    return { name, date, registrated, watched, city };
}

function createColumn(name: string, align: TableCellProps["align"] = "left") {
    return { name, align };
}

const columns = [
    createColumn("Name", "left"),
    createColumn("Date", "center"),
    createColumn("Registrated", "center"),
    createColumn("Watched", "center"),
    createColumn("City", "center"),
    createColumn("Edit", "center"),
    createColumn("Delete", "center"),
];

const rows = [
    createRow("Googoe.c", "20.01.2020", 5, 24, "Almaty"),
    createRow("Ice cream sandwich", "20.01.2020", 32, 37, "Almaty"),
    createRow("Eclair", "20.01.2020", 16, 24, "Almaty"),
    createRow("Cupcake", "20.01.2020", 42, 67, "Almaty"),
    createRow("Gingerbread", "20.01.2020", 16, 49, "New-York"),
];

const EventsTable: React.FC<{}> = () => {
    return (
        <TableContainer
            component={Paper}
            sx={{ borderRadius: "4px 4px 0px 0px" }}
        >
            <Table stickyHeader sx={{ minWidth: 500 }} size="small">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                sx={{ fontWeight: "bold" }}
                                align={column.align}
                            >
                                {column.name}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
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
                                        console.log(row.name);
                                    }}
                                >
                                    {row.name}
                                </Button>
                            </TableCell>
                            <TableCell align="center">{row.date}</TableCell>
                            <TableCell align="center">
                                {row.registrated}
                            </TableCell>
                            <TableCell align="center">{row.watched}</TableCell>
                            <TableCell align="center">{row.city}</TableCell>
                            <TableCell align="center">
                                <IconButton
                                    size="large"
                                    onClick={() => {}}
                                    color="primary"
                                >
                                    <EditOutlinedIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell align="center">
                                <IconButton
                                    size="large"
                                    onClick={() => {}}
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
    );
};

export default EventsTable;
