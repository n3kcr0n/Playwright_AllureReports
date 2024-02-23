import { test,expect } from "@playwright/test";
import CreateToDoPage from "../page-objects/createTodoPage";
import User from "../models/User";
import RegistrationPage from "../page-objects/RegistrationPage";

const testUser:User = new User();
test.describe('Create & Delete To do SUITE',async ()=>{
    test('TS01 _Able to create todo on the list',async ({page})=>{
        const registrationPage = new RegistrationPage();
        await registrationPage.load(page);
        await registrationPage.registerUser(
            page,
            testUser.getFirstname(),
            testUser.getLasttname(),
            testUser.getEmail(),
            testUser.getPassword());

        const createTodo = new CreateToDoPage();
        await createTodo.addTodo(page,'test1');
        expect(await page.locator(createTodo.todoItems).first().textContent()).toEqual('test1');
    });

    test('TS02 _Able to delete to do',async ({page})=>{
        const createTodo = new CreateToDoPage();
        await createTodo.load(page);
        await createTodo.deleteTodo(page,'test1');
    });
});