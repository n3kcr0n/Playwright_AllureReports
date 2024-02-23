import { Page } from "@playwright/test";

export default class CheckOutOverViewPage{
    checkoutOverview =async (page:Page)=>{
        await page.getByRole("link",{name:'FINISH'}).click();
        await page.waitForURL("https://www.saucedemo.com/v1/checkout-complete.html");
    }

    validateCheckout =async(page:Page):Promise<boolean>=>{
        return await page.getByText("THANK YOU FOR YOUR ORDER").isVisible();
    }

}