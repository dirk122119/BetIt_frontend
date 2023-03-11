import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(props) {


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    props.close()
  };

  return (
    <>
      <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={ {vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity={props.state} sx={{ width: "100%" }}>
          {props.message}
        </Alert>
      </Snackbar>
    </>
  );
}