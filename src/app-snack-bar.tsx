import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { handleApplicationWideMessage } from "./store/ui-slice";

const AppSnackBar: FC<{ message: string; type: string }> = ({
  message,
  type,
}) => {
  const ui = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {

    dispatch(handleApplicationWideMessage(null)); 
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClick}>Open Snackbar</Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          This is a success Alert inside a Snackbar!
        </Alert>
      </Snackbar>
    </div>
  );
};
