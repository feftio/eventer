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
import { eventService } from "src/services/event";
import {
    ErrorEventRegisterSwal,
    SuccessEventRegisterSwal,
} from "src/swal/event";

type EventRegistrationDialogProps = {
    id: string;
};

const EventRegistrationDialog: React.FC<EventRegistrationDialogProps> = (
    props
) => {
    const [name, setName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [contacts, setContacts] = React.useState<string>("");
    const [open, setOpen] = React.useState<boolean>(false);

    const handleSend = () => {
        handleClose();
        eventService.register(props.id, name, email, contacts).then(
            (response) => {
                SuccessEventRegisterSwal();
                setName("");
                setEmail("");
                setContacts("");
            },
            (error) => {
                ErrorEventRegisterSwal();
            }
        );
    };

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
                        email address and other contacts. The creator of this
                        event will contact you.
                    </DialogContentText>
                    <TextField
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="dense"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        value={contacts}
                        onChange={(e) => setContacts(e.target.value)}
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
