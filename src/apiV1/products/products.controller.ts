import { Request, Response } from "express";
import * as puppeteer from "puppeteer";
import FactoryParser from "../../parser/index";
import Product from "./products.model";

export default class ParserController {
  public parse = async (req: Request, res: Response): Promise<any> => {
    // shift this code in serverless function
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      "https://www.amazon.in/Sennheiser-CX-180-Street-II/dp/B00D75AB6I/ref=sxin_5?ascsubtag=amzn1.osa.ef216198-a19c-40ae-8605-23973647af0c.A21TJRUUN4KGV.en_IN&creativeASIN=B00D75AB6I&cv_ct_cx=earphones&cv_ct_id=amzn1.osa.ef216198-a19c-40ae-8605-23973647af0c.A21TJRUUN4KGV.en_IN&cv_ct_pg=search&cv_ct_wn=osp-single-source&keywords=earphones&linkCode=oas&pd_rd_i=B00D75AB6I&pd_rd_r=511fc72e-afa0-40e8-b544-363b1e17910d&pd_rd_w=U27Vn&pd_rd_wg=ryk9x&pf_rd_p=12ac42fc-a238-4b12-ab9d-3e8559aaf747&pf_rd_r=019D6QZ2P7Q4H8WBH51S&qid=1579428251&smid=A14CZOWI0VEHLG&tag=digitin-21"
    );
    const bodyHTML = await page.evaluate(() => document.body.innerHTML);
    await browser.close();

    // console.log("bodyHTML", bodyHTML);
    const productData = new FactoryParser("flipkart", "brand", bodyHTML);

    const product = new Product(productData);
    const productDocument = await product.save();

    res.json(productDocument);
  };
}
