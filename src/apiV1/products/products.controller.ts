import * as Bluebird from "bluebird";
import { fork } from "child_process";
import { Request, Response } from "express";
import * as os from "os";
import * as dataJson from "../../data/data.json";
import FactoryParser from "../../parser/index";
import Product, { IProduct } from "./products.model";

export default class ParserController {
  public parse = async (req: Request, res: Response): Promise<any> => {
    const { website, type, item } = req.body;
    const data = dataJson.data[website][type][item];
    // TODO convert to lambda function here
    const promiseArray = Bluebird.map(
      data,
      ({ url }) => {
        const promise = new Bluebird(resolve => {
          const process = fork("src/fork.js");
          // send list of e-mails to forked process
          process.send({ url });
          console.log("Url", url);
          // listen for messages from forked process
          process.on("message", async ({ text }) => {
            const productData = new FactoryParser().parse(website, type, text);
            const update: IProduct = { ...productData, productUrl: url };
            const filter = { name: update.name };
            const document = await Product.findOneAndUpdate(filter, update, {
              new: true,
              upsert: true
            });
            return resolve(document);
          });
        });
        return promise;
      },
      { concurrency: os.cpus().length }
    );

    const productDetails: any = await Bluebird.all(promiseArray);
    res.json(productDetails);
  };
}
