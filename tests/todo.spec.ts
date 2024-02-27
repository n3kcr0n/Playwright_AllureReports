import { test,expect } from "@playwright/test";
import CreateToDoPage from "../page-objects/createTodoPage";
import User from "../models/User";
import QaCartRegistrationPage from "../page-objects/qaRegistrationPage";
import LoginPage from "../page-objects/loginPage";

//TestData
const testUser:User = new User();
test.describe.configure({ mode: 'serial' });
test.describe('Create & Delete To do SUITE',async ()=>{

    test('TS01 _Register User',async ({page})=>{
        const registrationPage = new QaCartRegistrationPage();
        await registrationPage.load(page);
        await registrationPage.registerUser(
            page,
            testUser.getFirstname(),
            testUser.getLastname(),
            testUser.getEmail(),
            testUser.getPassword());

        //saving state 
        await page.context().storageState({path: 'qaCartAuth.json'});
    })

    test('TS02 _Able to create todo on the list',async ({page})=>{
        const loginPage = new LoginPage()
        await loginPage.load(page)
        await loginPage.userLogin(page,testUser.getEmail(),testUser.getPassword())
        const createTodo = new CreateToDoPage();
        await createTodo.load(page);
        await createTodo.addTodo(page,'test1');
        expect(await page.locator(createTodo.todoItems).first().textContent()).toEqual('test1');
    });

    test('TS03 _Able to delete to do',async ({page})=>{
        const loginPage = new LoginPage()
        await loginPage.load(page)
        await loginPage.userLogin(page,testUser.getEmail(),testUser.getPassword())
        const createTodo = new CreateToDoPage();
        await createTodo.load(page);
        await createTodo.deleteTodo(page,'test1');
        await expect(page.getByText('No Available Todos')).toBeVisible()
    });

});