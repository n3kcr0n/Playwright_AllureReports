import { Page } from "@playwright/test"

export default class SwagLoginPage{
    readonly url:string ="/index.html";

    load = async(page:Page)=>{
        await page.goto(process.env.SAUCEDEMO_BASEURL?.toString()+this.url);
        await page.waitForLoadState("domcontentloaded");
    }

    enterUsername = async (page:Page,username:string )=>{
        await page.getByPlaceholder("Username",{exact:true}).fill(username);
    }

    enterPassword = async (page:Page,password:string)=>{
        await page.getByPlaceholder("Password",{exact:true}).fill(password);
    }

    clickLoginButton = async (page:Page)=>{
        await page.getByRole("button",{name:"LOGIN"}).click();
    }


    userLogin = async (page:Page,username:string,password:string)=>{
        await this.enterUsername(page,username);
        await this.enterPassword(page,password);
        await this.clickLoginButton(page);
    }
}