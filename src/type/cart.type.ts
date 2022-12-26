import { IFormCreateProducts } from "./products.type";

export interface IFormDataCart extends IFormCreateProducts {
  sold: number;
  star: number;
  image: string;
}
