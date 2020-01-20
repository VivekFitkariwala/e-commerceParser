import { Request, Response } from "express";
import * as puppeteer from "puppeteer";
import * as dataJson from "../../data/data.json";
import FactoryParser from "../../parser/index";
import Product, { IProduct } from "./products.model";

export default class ParserController {
  public parse = async (req: Request, res: Response): Promise<any> => {
    const { website, type, item } = req.body;
    const data = dataJson.data[website][type][item];
    // TODO convert to lambda function here
    const promiseArray = data.map(async ({ url }) => {
      // shift this code in serverless function
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "load", timeout: 0 });
      const bodyHTML = await page.evaluate(() => document.body.innerHTML);
      await browser.close();

      const productData = new FactoryParser().parse(website, type, bodyHTML);
      const update: IProduct = { ...productData, productUrl: url };
      const filter = { name: update.name };
      return Product.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true
      });
    });

    const productDetails: IProduct[] = await Promise.all(promiseArray);
    res.json(productDetails);
  };
}
