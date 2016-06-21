declare class i2c
{
    /**
     * コンストラクタ
     * @param address
     * @param options
     */
    constructor(address: any, options: any);



}

declare module "i2c" {

    //import * as i2c from "./debug";

    export = i2c;
}