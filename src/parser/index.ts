import FlipkartBrand from "./flipkart/brand";
import FlipkartCategory from "./flipkart/category";

class FactoryParser {
  constructor(website: string, type: string, html: string) {
    switch (website) {
      case "flipkart":
        return type === "brand"
          ? new FlipkartBrand(html)
          : new FlipkartCategory(html);
    }
  }
}

export default FactoryParser;
