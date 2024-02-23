import { test,expect } from "@playwright/test";
import User from "../models/User";
import UserApi from "../apis/userApi";

//TestData
const testUser1:User = new User();
const testUser2:User = new User();
test.describe('QA CART Create to do via API',async ()=>{
    test('TS01 _Able to register using API',async ({request,context})=>{
        const response =await new UserApi().signUpUserAPI(request,testUser1,context);
        const responseBody = await response.json();
        expect(response.status()).toEqual(201);
    });

    test('TS03 _Able to create to do ',async ({request,context})=>{
        await new UserApi().signUpUserAPI(request,testUser2,context);
        const response = await new UserApi().createTodoAPI(request,'Playwright',testUser2);
        expect(response.status()).toEqual(201);
    });
});