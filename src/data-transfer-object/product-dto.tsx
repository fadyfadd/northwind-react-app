import { SupplierDto } from "./supplier-dto";

export type ProductDto = {
  productId?: number;
  productName?: string;
  supplierId?: number;
  categoryId?: number;
  quantityPerUnit?: string;
  unitsInStock?: number;
  unitInOrder?: number;
  reorderLevel?: number;
  discontinued?: false; 
  unitPrice?: number;
  supplier?: SupplierDto;
};
