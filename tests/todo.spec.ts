import { test,expect } from "@playwright/test";
import CreateToDoPage from "../page-objects/createTodoPage";

test.use({storageState: 'qaCartAuth.json'});
test.describe('Create & Delete To do SUITE',async ()=>{
    test('TS01 _Able to create todo on the list',async ({page})=>{
        const createTodo = new CreateToDoPage();
        await createTodo.load(page);
        await createTodo.addTodo(page,'test1');
        expect(await page.locator(createTodo.todoItems).first().textContent()).toEqual('test1');
    });

    test('TS02 _Able to delete to do',async ({page})=>{
        const createTodo = new CreateToDoPage();
        await createTodo.load(page);
        await createTodo.deleteTodo(page,'test1');
        expect(await createTodo.validateNoToDo(page)).toBeTruthy();
    });

});