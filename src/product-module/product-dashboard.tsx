import { FC } from "react";
import { useGetProductsQuery } from "../store/apis/product-api";
import ProductList from "./product-list";

const ProductDashboard: FC = () => {
  const { data, error, isLoading } = useGetProductsQuery();

  if (data) return <ProductList products={data}></ProductList>;
  return <span>No Data Found</span>;
};
export default ProductDashboard;
