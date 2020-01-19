import { Request, Response } from "express";
import * as puppeteer from "puppeteer";
import * as dataJson from "../../data/data.json";
import FactoryParser from "../../parser/index";
import Product, { IProduct } from "./products.model";

export default class ParserController {
  public parse = async (req: Request, res: Response): Promise<any> => {
    const { website, type } = req.body;

    const data = dataJson.data[website][type];
    // TODO convert to lambda function here
    const promiseArray = data.map(({ products }) => {
      return Promise.all(
        products.map(
          async ({ url }): Promise<IProduct> => {
            // shift this code in serverless function
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);
            const bodyHTML = await page.evaluate(() => document.body.innerHTML);
            await browser.close();

            const productData = new FactoryParser().parse(
              website,
              type,
              bodyHTML
            );
            return { ...productData, productUrl: url };
          }
        )
      );
    });

    const productDetails: IProduct[] = await Promise.all(promiseArray);
    const flattenedArray = [].concat(...productDetails);
    const savedData = await Product.insertMany(flattenedArray);
    res.json(savedData);
  };
}
