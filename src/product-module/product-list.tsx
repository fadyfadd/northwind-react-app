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

const ProductList: FC = () => {
  const { data, isFetching } = useGetProductsQuery();

  function onDeleteRequest(productId: number) {
    setIsOpen(true);
  }

  function onEdit(productId: number) {}

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

  useEffect(() => {
    dispatch(handleProgressIndicator(isFetching));
  }, [dispatch, isFetching]);

  function onConfirm() {
    setIsOpen(false);
  }

  function onReject(event: any) {
    setIsOpen(false);
  }

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <ConfirmationDialog
        open={isOpen}
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
        getRowId={(row: ProductDto) => row.productId}
      ></DataGrid>
    </>
  );
};

export default ProductList;
