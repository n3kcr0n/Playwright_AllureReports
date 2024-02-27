import { Page } from "@playwright/test";
import Base from "../page-objects/Base";

export default class LetCodeAlertPage extends Base{
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
    }

    async acceptSimpleAlert(){
        await this.page.locator('.field',{hasText:'Accept the Alert',}).getByRole('button',{name:'Simple Alert'}).click()
        this.page.on('dialog', dialog => dialog.accept());
    }

    async dismissAlertAndGetTheAlertText(){
        await this.page.locator('.field',{hasText:'Dismiss the Alert & print the alert text',}).getByRole('button',{name:'Confirm Alert'}).click();
        this.page.on('dialog',async dialog =>{
            console.log(dialog.message())
            
        })
    }

    async enterToPromptAlert(promtMessage:string){
        await this.page.locator('.field',{hasText:'Type your name & accept',}).getByRole('button',{name:'Prompt Alert'}).click();
        this.page.on('dialog',async dialog =>{
            await dialog.accept(promtMessage);
        })
    }

    async closeModernAlert(){
        await this.page.locator('.field',{hasText:'Sweet alert',}).getByRole('button',{name:'Modern Alert'}).click();
        await this.page.locator("div[class='modal is-active']").getByRole('button').click();
    }
}