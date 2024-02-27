import {expect, test} from "@playwright/test";
import User from "../models/User";
import PageManager from '../page-objects/pageManager'



const testUser = new User();

test('Forms Test Using User facing locattors',async ({page})=>{
    const pm = new PageManager(page)
    await pm.navigateToFormPage().load()
    await pm.navigateToFormPage().selectCategory('Forms')
    await pm.navigateToFormPage().fillUpForm(
        testUser.getFirstname(),
        testUser.getLastname(),
        testUser.getEmail(),
        "Philippines (+63)",
        "123245",
        "test addres",
        "test addres",
        "Manila",
        "1456",
        "Philippines",
        "011254",
        "Transgender",
        true)
})

test('Alerts Test', async ({page})=>{
    const pm = new PageManager(page)
    await pm.navigateToAlertPage().load()
    await pm.navigateToAlertPage().selectCategory('Alert')
    await pm.navigateToAlertPage().acceptSimpleAlert()
    await pm.navigateToAlertPage().dismissAlertAndGetTheAlertText()
    await pm.navigateToAlertPage().enterToPromptAlert("test")
    await pm.navigateToAlertPage().closeModernAlert()
})


test('Handling multiple tabs',async ({page,context})=>{
    const pm = new PageManager(page)
    await pm.navigateToWindowsTabPage().load()
    await pm.navigateToWindowsTabPage().selectCategory('Window')
    await pm.navigateToWindowsTabPage().clickOpenHomePageButton();
    await pm.navigateToWindowsTabPage().clickMultipleWindowsButton()
    //tabs are array of page instance of tabs of the browser context 
    //we can use tabs[0] to switch to another open tab
    const tabs = context.pages()
})

test('Handling Iframes ',async ({page})=>{
    const pm = new PageManager(page)
    await pm.navigateToFramePage().load()
    await pm.navigateToFramePage().selectCategory('Frame')
    const inner = await pm.navigateToFramePage().enterDetailsIframe(testUser.getFirstname(),testUser.getLastname(),testUser.getEmail())
    expect(inner).toEqual(testUser.getEmail())
})

test('Handling Tables',async ({page})=>{
    //Sum of all products
    const pm = new PageManager(page)
    await pm.navigateToTablePage().load()
    await pm.navigateToTablePage().selectCategory('Table')
    const actual = await pm.navigateToTablePage().getAllPriceShoppingListTable()
    const expected = await pm.navigateToTablePage().getPriceShoppingListTable()
    expect(actual).toEqual(expected)

    //clicking specific 
    await pm.navigateToTablePage().markUserAsPresent('Raj',true)
})








