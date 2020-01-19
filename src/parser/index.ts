class FactoryParser {
  public parse(website: string, type: string, html: string) {
    const Brand = require(`./${website}/brand`).default;
    const Category = require(`./${website}/brand`).default;
    return type === "brand"
      ? new Brand().parse(html)
      : new Category().parse(html);
  }
}

export default FactoryParser;
