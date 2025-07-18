import { FC, Fragment, useEffect, useState } from "react";
import { ProductDto } from "../data-transfer-object/product-dto";
import { useGetProductsQuery } from "../store/apis/product-api";
import { useDispatch } from "react-redux";
import { handleProgressIndicator } from "../store/ui-slice";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { SupplierDto } from "../data-transfer-object/supplier-dto";
import { Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import ConfirmationDialog from "../shared-components/confirmation-dialog";
import AddEditDialog from "./add-edit-dialog";

const ProductList: FC = () => {
  const { data, isFetching } = useGetProductsQuery();

  function onDeleteRequest(productId: number) {
    setIsConfirmationOpen(true);
  }



  const [productId, setProductId] = useState<number | null>(null);

  function onEdit(productId: number) {
    setProductId(productId);
    setIsAddEditOpen(true);
  }

  const columns: GridColDef[] = [
    { field: "productId", headerName: "Product Id", width: 140 },
    { field: "productName", headerName: "Product Name", width: 250 },
    {
      field: "supplier",
      headerAlign: "center",
      headerName: "supplier Name",
      width: 250,
      valueGetter: (supplier: SupplierDto, product: ProductDto) =>
        supplier.contactName,
    },
    {
      field: "unitPrice",
      headerName: "Unit Price",
      headerAlign: "center",
      width: 140,
      valueGetter: (param: any) => Math.round(param),
    },
    { field: "unitsInStock", headerName: "Unit in Cost", width: 140 },
    {
      field: "discontinued",
      headerName: "Discontinued",
      headerAlign: "center",
      width: 140,
      valueGetter: (param: any) => (param == 1 ? true : false),
    },
    {
      field: "Action",
      width: 160,
      headerAlign: "center",
      renderCell: (param: any) => (
        <Fragment>
          <Button
            onClick={() => {
              onEdit(param.row.productId);
            }}
            color="primary"
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              onDeleteRequest(param.row.productId);
            }}
            color="error"
          >
            DELETE
          </Button>
        </Fragment>
      ),
    },
  ];

  const dispatch = useDispatch();

  function onAddEditClose() {
    setIsAddEditOpen(false);
  }

  function onSubmit(productDto: ProductDto) {
    setIsAddEditOpen(false);
  }

  useEffect(() => {
    dispatch(handleProgressIndicator(isFetching));
}, [dispatch, isFetching]);

  function onConfirm() {
    setIsConfirmationOpen(false);
  }

  function onReject(event: any) {
    setIsConfirmationOpen(false);
  }

  function onAddNewProduct() {
    setProductId(null);
    setIsAddEditOpen(true);
  }

  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [isAddEditOpen, setIsAddEditOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        sx={{ mb: 2 }}
        variant="outlined"
        color="success"
        onClick={onAddNewProduct}
      >
        Insert
      </Button>

      <AddEditDialog
        open={isAddEditOpen}
        onClose={onAddEditClose}
        onSubmit={onSubmit}
        productId={productId}
      ></AddEditDialog>
      <ConfirmationDialog
        open={isConfirmationOpen}
        message="Are you sure you want to proceed"
        onClose={onReject}
        onConfirm={onConfirm}
      ></ConfirmationDialog>
      <DataGrid
        showToolbar
        columns={columns}
        pagination
        pageSizeOptions={[5, 10]}
        rows={data}
        initialState={{
          pagination: { paginationModel: { pageSize: 5, page: 0 } },
        }}
        getRowId={(row: ProductDto) =>
          "productId" in row ? row.productId ?? -1 : -1
        }
      ></DataGrid>
    </>
  );
};

export default ProductList;
