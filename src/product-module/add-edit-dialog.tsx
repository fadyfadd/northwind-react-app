import React, { FC, useState } from "react";
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
  initialData: ProductDto | {};
}> = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<ProductDto | {}>(initialData);

  const handleChange = (e: any) => {
    setFormData({ ...formData });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? "Edit Item" : "Add Item"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
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
