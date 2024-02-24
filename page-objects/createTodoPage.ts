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
    load = async(page:Page)=>{
        await page.goto(process.env.QACART_BASEURL+this.url);
    }
    addTodo = async (page:Page,todoName:string)=>{
        await page.locator(this.plusIcon).click();
        await page.locator(this.toDoTextBox).fill(todoName);
        await page.locator(this.createTodoBtn).click();
    }

    selectTodo = async (page:Page,name:string)=>{
        const items = await page.locator(this.todoItems).count();
        for(let i = 0;i<items;i++){
            if(await page.locator(this.todoItems).nth(i).textContent() == name){
                await page.locator(this.toDoItemsCheckbox).click();
                break;
            }
        }
    }

    deleteTodo = async(page:Page,name:string)=>{
        const items = await page.locator(this.todoItems).count();
        for(let i = 0;i<items;i++){
            if(await page.locator(this.todoItems).nth(i).textContent() == name){
                await page.locator(this.toDoDeleteIcon).nth(i).click();
                this.validateNoToDo(page);
                break;
            } else {
                throw new Error("Item not found");
            }
        }
    }

    validateNoToDo = async (page:Page):Promise<boolean>=>{
        return await page.getByText('No Available Todos').isVisible();
    }
}