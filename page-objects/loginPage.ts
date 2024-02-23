import {Page} from '@playwright/test';

export default class LoginPage{
    //Selector
    readonly url:string = "/login";
    readonly emailTextbox:string = "input#email";
    readonly passwordTextbox:string = "input#password";
    readonly loginBtn:string = "button#submit";

    //Methods
    public async load(page:Page){
        await page.goto(this.url);
    }

    public async enterEmailAddress(page:Page,email:string){
        await page.locator(this.emailTextbox).fill(email);
    }

    public async enterPassword(page:Page,pass:string){
        await page.locator(this.passwordTextbox).fill(pass);
    }

    public async clickLogintButton(page:Page){
        await page.locator(this.loginBtn).click();
        await page.waitForLoadState('domcontentloaded');
    }

    public async userLogin(page:Page,email:string,pass:string){
        await this.enterEmailAddress(page,email);
        await this.enterPassword(page,pass);
        await this.clickLogintButton(page);
    }
}