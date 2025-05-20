import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

export const HomePage: FC = () => {
  const authentication = useSelector(
    (selector: RootState) => selector.authentication
  );

  return (
    <div>
      Welcome <b>{authentication.userName}</b>
    </div>
  );
};
