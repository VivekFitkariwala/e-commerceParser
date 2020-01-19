import * as cheerio from "cheerio";

export default class {
  constructor(htmlString: string) {
    const $ = cheerio.load(htmlString);
  }
}
