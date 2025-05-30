import { FC, useEffect } from "react";
import { useGetProductsQuery } from "../store/apis/product-api";
import ProductList from "./product-list";
import { useDispatch } from "react-redux";
import { handleProgressIndicator } from "../store/ui-slice";

const ProductDashboard: FC = () => {
  const { data, isFetching } = useGetProductsQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isFetching) {
   
      dispatch(handleProgressIndicator(true));
    } else {
     
      dispatch(handleProgressIndicator(false));
    }
  }, [dispatch, isFetching]);

  if (data) return <ProductList products={data}></ProductList>;
  return <span>No Data Found</span>;
};
export default ProductDashboard;
