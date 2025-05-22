export type ProductDto = {
  productId: number;
  productName: string;
  supplierId: number;
  categoryId: number;
  quantityPerUnit: string;
  unitInStock: number;
  unitInOrder: number;
  reorderLevel: number;
  discontinued: false; 
  unitPrice: number;

};
