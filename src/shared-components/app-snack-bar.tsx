import * as React from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { FC } from "react";
import { useDispatch} from "react-redux";
import { handleApplicationWideMessage } from "../store/ui-slice";

const AppSnackBar: FC<{ message: string | null; type:  "error" | "info" | "success" | "warning" }> = ({
  message,
  type,
}) => {
  const dispatch = useDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    dispatch(handleApplicationWideMessage({ value: null , type:'error'}));
  };

  return (
    <div>
      <Snackbar
        open={message != null}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AppSnackBar;
