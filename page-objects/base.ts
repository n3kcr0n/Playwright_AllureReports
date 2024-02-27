import { Page } from "@playwright/test";

export default class Base{
    readonly page:Page;
    constructor(page:Page){
        this.page = page;
    }
}