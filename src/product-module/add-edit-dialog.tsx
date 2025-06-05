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
import { useGetProductByidQuery, useSaveOrUpdateProductMutation } from "../store/apis/product-api";
import { useGetSuppliersQuery } from "../store/apis/supplier-apis";
import { SupplierDto } from "../data-transfer-object/supplier-dto";
import {
  handleApplicationWideMessage,
  handleProgressIndicator,
} from "../store/ui-slice";
import { useDispatch } from "react-redux";
import { utilities } from "../shared-components/utilties";

const AddEditDialog: FC<{
  open: boolean;
  onClose: () => void;
  onSubmit: (event: ProductDto) => void;
  productId: number | null;
}> = ({ open, onClose, onSubmit, productId }) => {
  const [formData, setFormData] = useState<ProductDto | {}>({});
  const [supplierList, setSupplierList] = useState<SupplierDto[] | undefined>(
    []
  );

const [trigger , {isLoading ,  error , data:mutationData}] = useSaveOrUpdateProductMutation(); 


  const handleChange = (e: any) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const dispatch = useDispatch();
 
  const handleSubmit = () => {
    if (!("productName" in formData) || formData.productName?.trim() === "") {
      dispatch(
        handleApplicationWideMessage({
          value: "Product Name cannot be empty",
          type: "error",
        })
      );
      return;
    }

    if (!("supplierId" in formData) || formData.supplierId === -1) {
      dispatch(
        handleApplicationWideMessage({
          value: "Supplier cannot be empty",
          type: "error",
        })
      );
      return;
    }

    if (
      !("quantityPerUnit" in formData) ||
      formData.quantityPerUnit?.trim() === ""
    ) {
      dispatch(
        handleApplicationWideMessage({
          value: "Quantity per Unit cannot be empty",
          type: "error",
        })
      );
      return;
    }

   
    if (!utilities.isNumeric(formData.unitPrice)) {
      dispatch(
        handleApplicationWideMessage({
          value: "Unit Price cannot be empty",
          type: "error",
        })
      );
      return;
    }


    if (!utilities.isNumeric(formData.unitsInStock)) {
      dispatch(
        handleApplicationWideMessage({
          value: "Units in Stock cannot be empty",
          type: "error",
        })
      );
      return;
    }
    
    if (!utilities.isNumeric(formData.unitsOnOrder)) {
  
      dispatch(
        handleApplicationWideMessage({
          value: "Units on Order cannot be empty",
          type: "error",
        })
      );
      return;
    }

    if (!utilities.isNumeric(formData.reorderLevel)) {
      dispatch(
        handleApplicationWideMessage({
          value: "Reorder Level cannot be empty",
          type: "error",
        })
      );
      return;
    }

    if (!("discontinued" in formData) ||  (formData.discontinued != 0 &&  formData.discontinued != 1)  ) {
      dispatch(
        handleApplicationWideMessage({
          value: "Discontinued can only be 1 or 0",
          type: "error",
        })
      );
      return
      ;
    }

 
    trigger(formData)
    onSubmit({});
  };

  const { data: supplierListData, isFetching } = useGetSuppliersQuery();

  useEffect(() => {
    handleProgressIndicator(isFetching);
  }, [isFetching]);

  useEffect(() => {
    setSupplierList(supplierListData);
  }, [supplierListData]);

  const { data } = useGetProductByidQuery(productId == null ? -1 : productId, {
    skip: productId == null,
  });

  useEffect(() => {
  
    if (data && productId) {
      const newData = {...data , supplier:null}     
      setFormData(newData);
      
    }
    else setFormData({categoryId:1});
  }, [data, productId, open]);

  const suppliersOptions = supplierList?.map((supplier, i) => (
    <MenuItem value={supplier.supplierId} key={supplier.supplierId}>
      {supplier.contactName}
    </MenuItem>
  ));

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {productId == null ? "Insert Product" : "Update Product"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Product name"
          name="productName"
          value={"productName" in formData ? formData.productName : ""}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <Select
          value={"supplierId" in formData ? formData.supplierId : "-1"}
          name="supplierId"
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value={-1}>Select a Supplier</MenuItem>
          {suppliersOptions}
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
          label="Units in Stock"
          name="unitsInStock"
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
