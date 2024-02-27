import { Page } from "@playwright/test";
import {Base} from "../page-objects/Base";
export default class LetCodeFormPage extends Base{
    
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
        await this.page.waitForSelector('h1');
    }

    async fillUpForm(
        firstName:string,
        lastName:string,
        email:string,
        countryCode:string,
        phoneNumber:string,
        addressLine1:string,
        addressLine2:string,
        state:string,
        postalCode:string,
        country:string,
        dateOfBirth:string,
        gender:string,
        agreeTermAndCondition:boolean){

        await this.page.locator('.field',{hasText:'First Name',}).getByPlaceholder('Text input').fill(firstName)
        await this.page.locator('.field',{hasText:'Last Name',}).getByPlaceholder('Text input').fill(lastName)
        await this.page.locator('.field',{hasText:' Email',}).getByPlaceholder('Email input').fill(email)

        //Select using by Role --html tag must be UL we can use getByRole('list')
        //Select using by Role --html tag must be LI we can use getByRole('listitem')
        await this.page.locator('.field',{hasText:' Country code',}).locator('select').selectOption(countryCode)  
        await this.page.locator('.field',{hasText:' Phone Number',}).getByPlaceholder('Phone Number').fill(phoneNumber)   
        await this.page.locator('.field',{hasText:' Address Line-1',}).getByPlaceholder('Address Line-1').fill(addressLine1)  
        await this.page.locator('.field',{hasText:' Address Line-2',}).getByPlaceholder('Address Line-2').fill(addressLine2)  
        await this.page.locator('.field',{hasText:' State',}).getByPlaceholder('State').fill(state) 
        await this.page.locator('.field',{hasText:' Postal-Code',}).getByPlaceholder('Postal-Code').fill(postalCode) 
        await this.page.locator('.field',{has: this.page.getByText('Country',{exact:true})}).locator('select').selectOption(country) 
        await this.page.locator('.field',{hasText:' Date Of Birth',}).locator('#Date').pressSequentially(dateOfBirth,{delay:500})
        await this.page.locator('.field',{hasText:' Gender',}).getByLabel(gender).click()
        if(agreeTermAndCondition){
            await this.page.locator('.field',{hasText:' I agree to the '}).getByRole('checkbox').click()
        }
        await this.page.getByRole('button',{name:'Submit'}).click()
    }
}