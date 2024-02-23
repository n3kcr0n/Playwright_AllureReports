import { Page } from "@playwright/test";

export default class CartPage{
    checkoutItem =async(page:Page,item:string)=>{
        const itemName = await page.locator("div.cart_item div.inventory_item_name").getByText(item).innerText();
        const count = await page.locator("div.cart_item").first().count();
        if(item ==  itemName && count !== 0){
            await page.getByText("CHECKOUT").click();   
            await page.waitForURL("https://www.saucedemo.com/v1/checkout-step-one.html");
        }
    }
}