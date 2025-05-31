import { FC, Fragment, useEffect } from "react";
import { ProductDto } from "../data-transfer-object/product-dto";
import { useGetProductsQuery } from "../store/apis/product-api";
import { useDispatch } from "react-redux";
import { handleProgressIndicator } from "../store/ui-slice";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { SupplierDto } from "../data-transfer-object/supplier-dto";
import { Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

const ProductList: FC = () => {
  const { data, isFetching } = useGetProductsQuery();

  function onRemove(productId: number) {
    console.log(productId);
  }

  function onEdit(productId: number) {
    console.log(productId);
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
          <Button onClick={()=>{onRemove(param.row.productId)}} color="primary">Edit</Button>
          <Button onClick={()=>{onEdit(param.row.productId)}} color="error">DELETE</Button>
        </Fragment>
  ),
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleProgressIndicator(isFetching));
  }, [dispatch, isFetching]);

  return (
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
  );
};

export default ProductList;
