import { APIRequestContext, BrowserContext } from "@playwright/test";
import User from "../models/User";

export default class UserApi{
    public async signUpUserAPI(request:APIRequestContext,user:User,context?:BrowserContext){
        const response = await request.post(process.env.QACART_BASEURL+'/api/v1/users/register',{
            data:{
                email: user.getEmail(),
                password: "Test@123",
                firstName: user.getFirstname(), 
                lastName: user.getLastname()
            }
        });
        //Extracting from the request response
        const responseBody = await response.json();
        const responseCode = await response.status();
        //creating cookie from the request response
        const access_token = responseBody.access_token;
        const firstName = responseBody.firstName;
        const userID = responseBody.userID;

        user.setAccessToken(access_token);
        user.setUserID(userID);

        //Adding cookie in browser context so the browser know that this user is login
        // Usable if the is a state of browser
        await context?.addCookies([
            {
                name: 'access_token',
                value: access_token,
                url: process.env.QACART_BASEURL
            },
            {
                name: 'firstName',
                value: firstName,
                url: process.env.QACART_BASEURL
            },
            {
                name: 'userID',
                value: userID,
                url: process.env.QACART_BASEURL
            }
        ])
        
       //Print response 
        console.log(responseCode +"  "+ JSON.stringify(responseBody, null, 4));
        return response;
    }

    public async createTodoAPI(request:APIRequestContext,todo:string,user:User){
        return await request.post(process.env.QACART_BASEURL+'/api/v1/tasks',{
            data:{
                isCompleted: false,
                item: todo,
            },
            headers:{
                Authorization: `Bearer ${user.getAccessToken()}` ,
            }
        });
    }
}