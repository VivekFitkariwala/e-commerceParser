import * as cheerio from "cheerio";
import { IProduct } from "../../apiV1/products/products.model";

export default (htmlString: string): Omit<IProduct, "productUrl"> => {
  const $ = cheerio.load(htmlString);
  // product name
  const productName = $("#productTitle")
    .text()
    .trim();
  // console.log("productName", productName);

  // brand
  const brand = $("#bylineInfo")
    .text()
    .trim();
  // console.log("brand", brand);

  // product mrp
  const priceText = $("#price span.a-text-strike").text();
  const mrpPrice = parseInt(
    priceText
      .split("₹")
      .join("")
      .split(".")[0]
      .split(",")
      .join("")
      .trim(),
    10
  );

  // product price
  const price = parseInt(
    $("#priceblock_dealprice")
      .text()
      .split("₹")
      .join("")
      .split(".")[0]
      .split(",")
      .join("")
      .trim(),
    10
  );

  // image url
  const imageURL = $("#imgTagWrapperId img")
    .attr("src")
    .trim();

  // category
  const categoryPath = $("#nav-subnav img.nav-categ-image")
    .attr("alt")
    .trim();

  // discount
  const discountText = $(
    "#dealprice_savings td.priceBlockSavingsString"
  ).text();
  const discountArray = discountText.split("(");
  const discount = parseInt(
    discountArray[discountArray.length - 1]
      .split(")")
      .join("")
      .split("%")
      .join("")
      .trim(),
    10
  );

  const quantity = 1;

  const moq = 1;

  return {
    name: productName,
    brand,
    imageUrl: imageURL,
    price,
    mrp: mrpPrice,
    quantity,
    moq,
    discount,
    categoryPath
  };
};
