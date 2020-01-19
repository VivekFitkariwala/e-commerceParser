import { IProduct } from "../../apiV1/products/products.model";
import Common from "./common";

export default class {
  public parse(htmlString: string): Omit<IProduct, "productUrl"> {
    return Common(htmlString);
  }
}
