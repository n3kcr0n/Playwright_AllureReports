import { Page } from "@playwright/test";
import Base from "./Base";

export default class LetCodeFramePage extends Base{
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
    }

    async enterDetailsIframe(firstName:string,lastName:string,email:string){
        const firstFrame = this.page.frameLocator('div.card-content>iframe#firstFr')
        const emailTextBox = firstFrame.getByPlaceholder('Enter name')
        const lastNameTextBox = firstFrame.getByPlaceholder('Enter email')

        await emailTextBox.fill(firstName)
        await lastNameTextBox.fill(lastName)

        const innerFrame = firstFrame.frameLocator('iframe[src="innerFrame"]')
        const innerEmailTextbox = innerFrame.getByPlaceholder('Enter email')
        await innerEmailTextbox.fill(email)

        return innerEmailTextbox.inputValue()
    }
}