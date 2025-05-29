import { FC } from "react";
import { ProductDto } from "../data-transfer-object/product-dto";

const ProductList: FC<{ products: ProductDto[] }> = ({ products }) => {
  const productList = products.map((product: ProductDto) => (
    <tr key={product.productId}>
      <td>{product.productId}</td>
      <td>{product.productName}</td>
      <td>{product.unitPrice}</td>
      <td>{product.unitsInStock}</td>
      <td>{product.discontinued}</td>
    </tr>
  ));

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
