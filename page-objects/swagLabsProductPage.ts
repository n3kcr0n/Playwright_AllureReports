import { Page } from "@playwright/test";

export default class ProductsPage{

    addToCart = async (page:Page,productName:string)=>{
        await page.locator("div.inventory_item")
            .filter({hasText:productName})
            .getByText('ADD TO CART',{exact:true}).click();
    }

    goToCart = async(page:Page)=>{
        await page.locator("#shopping_cart_container").click();
        await page.waitForLoadState("networkidle");
        await page.waitForURL("https://www.saucedemo.com/v1/cart.html");
    }


}