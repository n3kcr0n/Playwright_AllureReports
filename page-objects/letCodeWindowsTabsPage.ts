import { Page } from "@playwright/test";
import Base from "../page-objects/Base";

export default class LetCodeWindowsTabs extends Base {
    constructor(page:Page){
        super(page)
    }

    async load(){
        await this.page.goto(process.env.LETCODE_BASEURL+'/test');
        await this.page.waitForLoadState('domcontentloaded')
        await this.page.waitForSelector('h1');
    }

    async selectCategory(title:string){
        await this.page.locator('app-menu',{hasText:title}).locator('footer').click();
        await this.page.waitForLoadState('domcontentloaded')
        await this.page.waitForSelector('h1');
        await this.page.getByText('Open Home Page',{exact:true}).waitFor({state:'visible'})
    }

    async clickOpenHomePageButton(){
        const [newTab] = await Promise.all([
            this.page.waitForEvent('popup'),
            await this.page.getByText('Open Home Page',{exact:true}).click(),
        ]);
        await newTab.waitForLoadState('domcontentloaded');
        return newTab;
    }

    async clickMultipleWindowsButton(){
        const [newTab] = await Promise.all([
            this.page.waitForEvent('popup'),
            await this.page.getByText('Muiltiple windows',{exact:true}).click()
            
        ]);
        await newTab.waitForLoadState('domcontentloaded');
        return newTab;
    }
}