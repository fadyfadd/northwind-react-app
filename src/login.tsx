import { FC, Fragment } from "react";
import { useDispatch } from "react-redux";
import { login } from "./store/authentication-slice";
import { Role } from "./role";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
  const dispatcher = useDispatch();
  const navigator = useNavigate();

  function clickMe() {
    dispatcher(
      login({ isAuthenticated: true, userName: "fadyfadd", role: Role.Admin })
    );

    navigator("/home");
  }

  return (
    <Fragment>
      <br />
      <input placeholder="username"></input>
      <br />
      <input placeholder="password"></input>
      <br />
      <br />
      <button onClick={clickMe}>Click Me</button>
    </Fragment>
  );
};

export default Login;
