import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import React from "react";
import { useRootSelector } from "src/redux";

function createRow(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createRow("Googoe.c", 159, 6.0, 24, 4.0),
    createRow("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createRow("Eclair", 262, 16.0, 24, 6.0),
    createRow("Cupcake", 305, 3.7, 67, 4.3),
    createRow("Gingerbread", 356, 16.0, 49, 3.9),
];

const EventsTable: React.FC<{}> = () => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Event</TableCell>
                        <TableCell align="left">Calories</TableCell>
                        <TableCell align="left">Fat&nbsp;(g)</TableCell>
                        <TableCell align="left">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="left">Protein&nbsp;(g)</TableCell>
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
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="left">{row.calories}</TableCell>
                            <TableCell align="left">{row.fat}</TableCell>
                            <TableCell align="left">{row.carbs}</TableCell>
                            <TableCell align="left">
                                <Button size="small" onClick={() => {}}>
                                    Edit
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EventsTable;
