import { FC } from "react";
import { useGetProductsQuery } from "../store/apis/product-api";
import ProductList from "./product-list";
import { useDispatch, useSelector } from "react-redux";
 import { handleProgressIndicator } from "../store/ui-slice";

const ProductDashboard: FC = () => {
  const { data, error, isFetching } = useGetProductsQuery();

  const dispatch = useDispatch()
  
  if (isFetching) {
    dispatch(handleProgressIndicator(true))
     
  }
  else {
     dispatch(handleProgressIndicator(false))
 
  }

  if (data) return <ProductList products={data}></ProductList>;
  return <span>No Data Found</span>;
};
export default ProductDashboard;
