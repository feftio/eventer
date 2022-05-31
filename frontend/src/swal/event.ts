import Swal from "src/swal";

export const SuccessEventCreateSwal = () => {
    Swal.fire({
        title: "Creation was success!",
        html: "Now you can look at it...",
        icon: "success",
    });
};

export const ErrorEventCreateSwal = () => {
    Swal.fire({
        title: "Creation was failed!",
        text: "Try to put something else...",
        icon: "error",
        confirmButtonText: "Ok",
    });
};

export const DeleteEventSwal = (handler: CallableFunction) => {
    Swal.fire({
        title: "Do you really want to delete this event?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
    }).then((result) => {
        if (result.isConfirmed) handler();
    });
};

export const SuccessEventRegisterSwal = () => {
    Swal.fire({
        title: "Your data has been sent!",
        html: "You will be contacted soon...",
        icon: "success",
    });
};

export const ErrorEventRegisterSwal = () => {
    Swal.fire({
        title: "Sending was failed!",
        text: "Try to put something else...",
        icon: "error",
        confirmButtonText: "Ok",
    });
};

export const SuccessSaveEditorSettingSwal = () => {
    Swal.fire({
        title: "Success saved!",
        icon: "success",
    });
};

export const ErrorSaveEditorSettingSwal = () => {
    Swal.fire({
        title: "Failed saving",
        icon: "error",
        confirmButtonText: "Ok",
    });
};
