import {Page} from '@playwright/test';

export default class RegistrationPage{
    readonly url:string = '/signup';
    //Methods
    public async load(page:Page){
        await page.goto(process.env.QACART_BASEURL+this.url);
    }

    public async fillRegistrationForm(page:Page,firstName:string,lastName:string,email:string,password:string){
        await page.locator("input[data-testid='first-name']").fill(firstName);
        await page.locator("input[data-testid='last-name']").fill(lastName);
        await page.locator("input[data-testid='email']").fill(email);
        await page.locator("input[data-testid='password']").fill(password);
        await page.locator( "input[data-testid='confirm-password']").fill(password);
    }
    
    public async submitRegistration(page:Page){
        await page.locator("button[data-testid='submit']").click();
        await page.locator("[data-testid=welcome]").waitFor({state:'visible'});
    }

    public async registerUser(page:Page,firstName:string,lastName:string,email:string,password:string){
        await this.fillRegistrationForm(page,firstName,lastName,email,password);
        await this.submitRegistration(page);
    }
}