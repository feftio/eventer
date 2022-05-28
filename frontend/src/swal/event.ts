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
