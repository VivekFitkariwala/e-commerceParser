import * as cheerio from "cheerio";

export default class {
  constructor(htmlString: string) {
    const $ = cheerio.load(htmlString);
    // product name
    const productName = $("#productTitle")
      .text()
      .trim();
    console.log("productName", productName);

    // brand
    const brand = $("#bylineInfo")
      .text()
      .trim();
    console.log("brand", brand);

    // product mrp
    const priceText = $("#price span.a-text-strike").text();
    const mrpPrice = priceText
      .split("₹")
      .join("")
      .split(".")[0]
      .split(",")
      .join("")
      .trim();
    console.log("mrpPrice", mrpPrice);

    // product price
    const price = $("#priceblock_dealprice")
      .text()
      .split("₹")
      .join("")
      .split(".")[0]
      .split(",")
      .join("")
      .trim();
    console.log("price", price);

    // image url
    const imageURL = $("#imgTagWrapperId img")
      .attr("src")
      .trim();
    console.log("imageURL", imageURL);

    // category
    const categoryPath = $("#nav-subnav img.nav-categ-image")
      .attr("alt")
      .trim();
    console.log("categoryPath", categoryPath);

    // discount
    const discountText = $(
      "#dealprice_savings td.priceBlockSavingsString"
    ).text();
    const discountArray = discountText.split("(");
    const discount = discountArray[discountArray.length - 1]
      .split(")")
      .join("")
      .split("%")
      .join("")
      .trim();
    console.log("discount", discount);

    const quantity = 1;
    console.log("quantity", quantity);

    const moq = 1;
    console.log("moq", moq);

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
  }
}
