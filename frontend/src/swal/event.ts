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
