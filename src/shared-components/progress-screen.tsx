import { FC } from "react";
import { CircularProgress, Backdrop } from "@mui/material";
 

const ProgressScreen: FC<{ open: boolean }> = ({ open }) => {
       
    return (
    <div>
 
      <Backdrop  
        sx={(theme) => ({ zIndex: 100000 ,  backgroundColor: "rgba(255, 255, 255, 0.2)"})}
        open={open}  
      >
        <CircularProgress color="success" />
      </Backdrop>
    </div>
  );
};

export default ProgressScreen;
