import React, { FC, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ProductDto } from "../data-transfer-object/product-dto";
import { useGetProductByidQuery } from "../store/apis/product-api";

const AddEditDialog: FC<{
  open: boolean;
  onClose: () => void;
  onSubmit: (event: ProductDto) => void;
  productId: number | null;
}> = ({ open, onClose, onSubmit, productId }) => {
  const [formData, setFormData] = useState<ProductDto | {}>({});
  const handleChange = (e: any) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    onClose();
  };

  const { data } = useGetProductByidQuery(productId == null ? -1 : productId, {
    skip: productId == null,
  });

  useEffect(() => {
    if (data && productId) setFormData(data);
    else setFormData({});
  }, [data, productId]);

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
        <Select value={-1} name="supplierId" fullWidth>
          <MenuItem value={-1}>Select a Supplier</MenuItem>
        </Select>
        <TextField
          label="Quantity Per Unit"
          name="quantityPerUnit"
          value={"quantityPerUnit" in formData ? formData.quantityPerUnit : ""}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Unit Price"
          name="unitPrice"
          type="number"
          value={"unitPrice" in formData ? formData.unitPrice : ""}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Unit in Stock"
          name="unitInStock"
          type="number"
          value={"unitsInStock" in formData ? formData.unitsInStock : ""}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Units on Order"
          name="unitsOnOrder"
          type="number"
          value={"unitsOnOrder" in formData ? formData.unitsOnOrder : ""}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Reorder Level"
          name="reorderLevel"
          type="number"
          value={"reorderLevel" in formData ? formData.reorderLevel : ""}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Discontinued"
          name="discontinued"
          type="number"
          value={"discontinued" in formData ? formData.discontinued : ""}
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
