import {expect, test} from "@playwright/test";
import SwagLoginPage from "../page-objects/swagLabsLoginPage";
import ProductsPage from "../page-objects/swagLabsProductPage";
import CartPage from "../page-objects/swagLabsCartPage";
import CheckOutInfoPage from "../page-objects/swagLabsCheckoutInfoPage";
import CheckOutOverViewPage from "../page-objects/swagLabsCheckoutOverviewPage";

//test.describe.configure({ mode: 'serial' });
test.describe('Swag Labs Suite',async ()=>{
      test('Login in the Application',async ({browser})=>{
            const context = await browser.newContext();
            const page = await context.newPage();
            const swagLoginPage = new SwagLoginPage();
            await swagLoginPage.load(page);
            await swagLoginPage.userLogin(page,"standard_user","secret_sauce");
      });

      test('Oder product in the Application',async ({page})=>{
            const swagLoginPage = new SwagLoginPage();
            await swagLoginPage.load(page);
            await swagLoginPage.userLogin(page,"standard_user","secret_sauce");
            
            const swagLabsProductPage = new ProductsPage();
            await swagLabsProductPage.addToCart(page,"Sauce Labs Fleece Jacket");
            await swagLabsProductPage.goToCart(page);

            const swagLabsCartPage = new CartPage();
            await swagLabsCartPage.checkoutItem(page,"Sauce Labs Fleece Jacket");

            const swagLabsCartInfoPage = new CheckOutInfoPage();
            await swagLabsCartInfoPage.fillCheckoutInfo(page,"John","Doe","4212");

            const swagLabsCheckoutOverviewPage = new CheckOutOverViewPage();
            await swagLabsCheckoutOverviewPage.checkoutOverview(page);

            expect(swagLabsCheckoutOverviewPage.validateCheckout).toBeTruthy();
      });

      test('Visual Test Usign playwright screenshot',async ({page})=>{
            await page.goto("https://www.saucedemo.com/v1/index.html");
             //Take screenshot of an element 
            await page.locator("img.bot_column").screenshot({ animations: 'disabled', path: './screenshots/elementImage.png' });
            //Take full page screenshot
            await page.screenshot({path: './screenshots/wholePage.png',fullPage:true});
            //Visual Testing 
            expect(await page.screenshot()).toMatchSnapshot('./screenshots/wholePage.png');
      });

});

