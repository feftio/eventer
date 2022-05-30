import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import React from "react";

const EventRegistrationDialog: React.FC = () => {
    const [open, setOpen] = React.useState(false);

    const handleSend = () => {};

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={handleClickOpen}
                sx={{ borderRadius: 0 }}
            >
                Register
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Register for the event</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To register for this event, please enter your name,
                        email address and other contacts. The creator will
                        contact you.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Contacts"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSend}>Send</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EventRegistrationDialog;
