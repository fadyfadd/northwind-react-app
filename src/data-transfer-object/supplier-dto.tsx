import { ProductDto } from "./product-dto";

export class SupplierDto {
  supplierId?: number;
  companyName?: string;
  contactName?: string;
  contactTitle?: string;
  address?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
  fax?: string;
  homePage?: string;
  Products?: ProductDto[];
}
