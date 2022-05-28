import { css } from "@emotion/react";
import _Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Swal = withReactContent(_Swal).mixin({
    customClass: {
        confirmButton: "swal-button swal-confirm",
        cancelButton: "swal-button swal-cancel",
        denyButton: "swal-button swal-deny",
    },
    buttonsStyling: false,
});

export default Swal;
