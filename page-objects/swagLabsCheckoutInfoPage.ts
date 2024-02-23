import { Page } from "@playwright/test";

export default class CheckOutInfoPage{
    fillCheckoutInfo= async(page:Page,firstName:string,lastName:string,postal:string)=>{
        await page.getByPlaceholder("First Name").fill(firstName);
        await page.getByPlaceholder("Last Name").fill(lastName);
        await page.getByPlaceholder("Zip/Postal Code").fill(postal);
        await page.locator("div.checkout_buttons>input[type='submit']").click();
        await page.waitForURL("https://www.saucedemo.com/v1/checkout-step-two.html");
    }
}