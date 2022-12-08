export interface IFormSearchProducts {
  product_id: string;
  product_name: string;
  product_code: string;
  category_id: any[];
  facturers: string;
  status: string;
  price_from: string;
  price_to: string;
  stock_from: string;
  stock_to: string;
  offset: string;
  size: string;
}

export interface IFormCreateProducts {
  product_id: string;
  product_name: string;
  product_price: string;
  facturers: string;
  stock: string;
  status: string;
  category_name: string[];
}

export interface IFormUpload extends IFormSearchProducts {}
