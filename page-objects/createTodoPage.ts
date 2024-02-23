import { Page } from "@playwright/test";

export default class CreateToDoPage{
    //Selectors
    readonly url:string = "/todo";
    readonly plusIcon:string = "svg[data-testid='add']";
    readonly toDoTextBox:string = "input[data-testid='new-todo']";
    readonly createTodoBtn:string = "button[data-testid='submit-newTask']";
    readonly todoItems:string = "[data-testid='todo-item']";
    readonly toDoItemsCheckbox:string = "input[data-testid='complete-task']";
    readonly toDoDeleteIcon:string = "button[data-testid='delete']";
    readonly noToDoMessage:string = "[data-testid='no-todos']";

    //Methods
    public async load(page:Page){
        await page.goto(process.env.QACART_BASEURL+this.url);
    }
    public async addTodo(page:Page,todoName:string){
        await page.locator(this.plusIcon).click();
        await page.locator(this.toDoTextBox).fill(todoName);
        await page.locator(this.createTodoBtn).click();
    }

    public async selectTodo(page:Page,name:string){
        const items = await page.locator(this.todoItems).count();
        for(let i = 0;i<items;i++){
            if(await page.locator(this.todoItems).nth(i).textContent() == name){
                await page.locator(this.toDoItemsCheckbox).click();
                break;
            }
        }
    }

    public async deleteTodo(page:Page,name:string){
        const items = await page.locator(this.todoItems).count();
        for(let i = 0;i<items;i++){
            if(await page.locator(this.todoItems).nth(i).textContent() == name){
                await page.locator(this.toDoDeleteIcon).nth(i).click();
                break;
            }
        }
    }
}