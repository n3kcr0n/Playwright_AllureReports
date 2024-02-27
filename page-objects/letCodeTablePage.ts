import { Page } from "@playwright/test";
import Base from "./Base";

export default class LetCodeTablePage extends Base{
    constructor(page:Page){ 
        super(page)
    }

    async load(){
        await this.page.goto(process.env.LETCODE_BASEURL+'/test');
        await this.page.waitForLoadState('domcontentloaded')
        await this.page.waitForSelector('h1');
    }

    async selectCategory(title:string){
        await this.page.locator('app-menu',{hasText:title}).locator('footer').first().click();
        await this.page.waitForLoadState('domcontentloaded')
        await this.page.waitForSelector('h1');
    }

    async getAllPriceShoppingListTable(){
        const rows = this.page.locator('.field',{hasText:'Shopping List'}).locator('table#shopping').locator('tbody').getByRole('row')
        const column = rows.locator('td')
        
        
        let total=0;
        let i=0;
        let actual = new Array()
        for(let row of await rows.all()){
            if(await row.locator('td').nth(1).textContent() != null){
                let content = await row.locator('td').nth(1).textContent()
                 actual.push(content)
                 total += parseInt(actual[i])
                 i++;
            }
        }
        return total.toString()
    }

    async getPriceShoppingListTable(){
        const tablefooter =this.page.locator('.field',{hasText:'Shopping List'}).locator('table#shopping').locator('tfoot')
        return tablefooter.locator('td').nth(1).textContent()
    }

    async markUserAsPresent(name:string,present:boolean){
        const table = this.page.locator('#simpletable')
        const checkbox = table.locator('tbody').locator('tr',{hasText:name}).locator('input')
        await checkbox.click()
        
    }

}