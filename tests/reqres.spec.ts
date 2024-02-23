import {expect, test} from "@playwright/test";
import User from "../models/User";
import ReqresApi from "../apis/reqresApi";


    const rand = Math.floor(Math.random() * 100) + 1;
    const currentYear = new Date().getFullYear();
    const reqresApi = new ReqresApi();
    const page = 1;
    const per_page = 5;

test.describe('Reqres API  https://reqres.in/api-docs',async ()=>{
    test('GET: set of Users',async ({request})=>{
        //Sample query params
        const resposne =await reqresApi.getUser_GET(request,page,per_page);
        expect(resposne.status()).toEqual(200);
    });

    test('PUT: update a specific user',async ({request})=>{
        const response = await reqresApi.updateUser_PUT(request,rand,"This is an update!");
        expect((await response.body()).toString()).toContain(currentYear.toString());
    })

    const testUser = new User();
    test('POST: register a user ',async ({request})=>{
        const response =await reqresApi.createUser_POST(request,testUser.getFirstname(),testUser.getEmail(),"Test@123");
        expect(response.status()).toBe(201);
    });

    test('DELETE: delete a user',async ({request})=>{
        const response = await reqresApi.deleteUser_DELETE(request,rand);
        expect(response.status()).toBe(204);
    });
});