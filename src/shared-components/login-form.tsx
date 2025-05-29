import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { login } from "../store/authentication-slice";
import { useRef } from "react";
import { useLazyGetUserProfileQuery } from "../store/apis/user-api";
import { UserProfileDto } from "../data-transfer-object/user-profile-dto";
import { useNavigate } from "react-router-dom";
import {
  handleApplicationWideMessage,
  handleProgressIndicator,
} from "../store/ui-slice";

export default function FormDialog() {
  const dispatch = useDispatch();

  var authentication = useSelector(
    (selector: RootState) => selector.authentication
  );

  const [trigger, { data, error, isFetching }] = useLazyGetUserProfileQuery();
  var navigate = useNavigate();

  if (isFetching) {
    dispatch(handleProgressIndicator(true));
  } else {
    dispatch(handleProgressIndicator(false));
  }

  React.useEffect(() => {
    if (error) {
      var _error = error as {
        status: number;
        data: { errorMessage: string; errorType: string };
      };

      if (_error.status === 400 && _error.data.errorMessage)        
        dispatch(
          handleApplicationWideMessage({
            value: _error.data.errorMessage,
            type: "error",
          })
        );
    }
  }, [error]);

  if (data) {
    dispatch(handleProgressIndicator(false));
    dispatch(login(data as UserProfileDto));
    navigate("home");
  }

  const loginAction = () => {
    var userNameValue = userNameField.current?.value;
    var passwordValue = passwordField.current?.value;

    if (userNameValue && passwordValue) {
      trigger({ userName: userNameValue, password: passwordValue });
    }
  };

  const userNameField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);

  return (
    <React.Fragment>
      <Dialog
        open={authentication.token == null}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const email = formJson.email;
              console.log(email);
            },
          },
        }}
      >
        <DialogTitle>Login Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a valid Username and Password
          </DialogContentText>
          <TextField
            inputRef={userNameField}
            autoFocus
            required
            margin="dense"
            id="userName"
            name="userName"
            label="User name"
            fullWidth
            variant="standard"
          />
          <TextField
            inputRef={passwordField}
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            type="password"
            label="Password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={loginAction}>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
