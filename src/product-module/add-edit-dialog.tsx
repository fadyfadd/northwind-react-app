import React, { FC, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { ProductDto } from "../data-transfer-object/product-dto";

const AddEditDialog: FC<{
  open: boolean;
  onClose: () => void;
  onSubmit: (event: ProductDto) => void;
  productId: number | null;
}> = ({ open, onClose, onSubmit, productId }) => {
  const [formData, setFormData] = useState<ProductDto | {}>({});

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.Name]: e.target.Value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{productId == null ? "Insert" : "Update"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Product name"
          name="productName"
          value={"productName" in formData ? formData.productName : ""}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditDialog;
