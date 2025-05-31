import { FC, useEffect } from "react";
import { ProductDto } from "../data-transfer-object/product-dto";
import { useGetProductsQuery } from "../store/apis/product-api";
import { useDispatch } from "react-redux";
import { handleProgressIndicator } from "../store/ui-slice";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { SupplierDto } from "../data-transfer-object/supplier-dto";
import { GridToolbar } from "@mui/x-data-grid";
 

const ProductList: FC = () => {
  const { data, isFetching } = useGetProductsQuery();

  const columns = [
    { field: "productId", headerName: "Product Id", width: 140 },
    { field: "productName", headerName: "Product Name", width: 200 },
    {
      field: "supplier",
      headerName: "supplier Name",
      width: 200,
      valueGetter: (supplier: SupplierDto, product: ProductDto) =>
        supplier.contactName,
    },
    {
      field: "unitPrice",
      headerName: "Unit Price",
      width: 140,
      valueGetter: (param: any) => Math.round(param),
    },
    { field: "unitsInStock", headerName: "Unit in Cost", width: 140 },
    {field:'discontinued' , headerName:"Discontinued" , width:140 , valueGetter: (param:any)=>param == 1 ? true : false}
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
