import { test } from '@playwright/test';
import User from "../models/User";
import QaCartRegistrationPage from '../page-objects/qaRegistrationPage';

//TestData
const testUser:User = new User();
test.describe('User Registration SUITE',async ()=>{
    test('TS01 _Able to register a user.', async({browser})=>{
        const context = await browser.newContext();
        const page = await context.newPage();
        const registrationPage = new QaCartRegistrationPage();
        await registrationPage.load(page);
        await registrationPage.registerUser(
            page,
            testUser.getFirstname(),
            testUser.getLasttname(),
            testUser.getEmail(),
            testUser.getPassword());

        //saving state 
        await page.context().storageState({path: 'qaCartAuth.json'});
    });
});

