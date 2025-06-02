import { SupplierDto } from "./supplier-dto";

export type ProductDto = {
  productId?: number;
  productName?: string;
  supplierId?: number;
  categoryId?: number;
  quantityPerUnit?: string;
  unitsInStock?: number;
  unitsOnOrder?: number;
  reorderLevel?: number;
  discontinued?: number; 
  unitPrice?: number;
  supplier?: SupplierDto;
};
