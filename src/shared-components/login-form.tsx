import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
 import DialogContent from "@mui/material/DialogContent";
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
import { NorthWindWebApiError } from "./northwind-web-api-error";
import { Box, Container, Typography } from "@mui/material";

export default function LoginScreen() {
  const dispatch = useDispatch();

  var authSelector = useSelector(
    (selector: RootState) => selector.authentication
  );

  const [trigger, { data, error, isFetching }] = useLazyGetUserProfileQuery();
  var navigate = useNavigate();

  React.useEffect(() => {
    dispatch(handleProgressIndicator(isFetching));
  }, [dispatch, isFetching]);

  React.useEffect(() => {
    if (error) {
      var _error = error as NorthWindWebApiError;

      if (_error.status === 400 && _error.data.errorMessage)
        dispatch(
          handleApplicationWideMessage({
            value: _error.data.errorMessage,
            type: "error",
          })
        );
    }
  }, [dispatch, error]);

  React.useEffect(() => {
    if (data) {
      dispatch(handleProgressIndicator(false));
      dispatch(login(data as UserProfileDto));
      navigate("home");
    }
  }, [data, dispatch, navigate]);

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
      <Dialog open={authSelector.token == null}>
     
        <DialogContent>
          <Container maxWidth="xs">
            <Box
              sx={{             
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h5">Sign In</Typography>
              <Box component="form" sx={{ mt: 2 }}>
                <TextField fullWidth   inputRef={userNameField} label="Username" margin="normal" required />
                <TextField   inputRef={passwordField}
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  required
                />
                <Button onClick={loginAction} fullWidth variant="contained" sx={{ mt: 2 }}>
                  Login
                </Button>
              </Box>
            </Box>
          </Container>
        </DialogContent>
    
      </Dialog>
    </React.Fragment>
  );
}
