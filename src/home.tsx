import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { handleProgressIndicator } from "./store/ui-slice";

export const HomePage: FC = () => {
  const authentication = useSelector(
    (selector: RootState) => selector.authentication
  );

const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleProgressIndicator(false));
  }, [dispatch]);

  return (
    <div>
      Welcome <b>{authentication.userName}</b>
    </div>
  );
};
 
