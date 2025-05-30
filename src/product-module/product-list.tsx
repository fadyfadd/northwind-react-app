import { FC, useEffect } from "react";
import { ProductDto } from "../data-transfer-object/product-dto";
import { useGetProductsQuery } from "../store/apis/product-api";
import { useDispatch } from "react-redux";
import { handleProgressIndicator } from "../store/ui-slice";

const ProductList: FC = () => {
  const { data, isFetching } = useGetProductsQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isFetching) {
      dispatch(handleProgressIndicator(true));
    } else {
      dispatch(handleProgressIndicator(false));
    }
  }, [dispatch, isFetching]);

  let productList: any;
  if (data) {
    productList = data.map((product: ProductDto) => (
      <tr key={product.productId}>
        <td>{product.productId}</td>
        <td>{product.productName}</td>
        <td>{product.unitPrice}</td>
        <td>{product.unitsInStock}</td>
        <td>{product.discontinued}</td>
      </tr>
    ));
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Product Id</th>
          <th>Product Name</th>
          <th>Unit Price</th>
          <th>Unit in Stock</th>
          <th>Is Discontinued</th>
        </tr>
      </thead>
      <tbody>{productList}</tbody>
    </table>
  );
};

export default ProductList;
