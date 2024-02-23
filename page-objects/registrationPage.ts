import {Page} from '@playwright/test';



export class RegistrationPage{
    //Selectors
    readonly url:string = '/signup';
    readonly firstNameTextBox:string = "input[data-testid='first-name']";
    readonly lastNameTextBox:string = "input[data-testid='last-name']";
    readonly emailTextBox:string = "input[data-testid='email']";
    readonly passwordTextBox:string = "input[data-testid='password']";
    readonly repeatPasswordTextBox:string = "input[data-testid='confirm-password']";
    readonly submitBtn:string = "button[data-testid='submit']";
    readonly welcomeTitle:string = "[data-testid=welcome]";

    //Methods
    public async load(page:Page){
        await page.goto(process.env.QACART_BASEURL?.toString()+this.url);
    }

    public async fillRegistrationForm(page:Page,firstName:string,lastName:string,email:string,password:string){
        await page.locator(this.firstNameTextBox).fill(firstName);
        await page.locator(this.lastNameTextBox).fill(lastName);
        await page.locator(this.emailTextBox).fill(email);
        await page.locator(this.passwordTextBox).fill(password);
        await page.locator(this.repeatPasswordTextBox).fill(password);
    }
    
    public async submitRegistration(page:Page){
        await page.locator(this.submitBtn).click();
        await page.locator(this.welcomeTitle).waitFor({state:'visible'});
    }

    public async registerUser(page:Page,firstName:string,lastName:string,email:string,password:string){
        await this.fillRegistrationForm(page,firstName,lastName,email,password);
        await this.submitRegistration(page);
    }
}