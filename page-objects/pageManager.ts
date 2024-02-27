import {Page} from '@playwright/test'
import LetCodeFormPage from "../page-objects/letCodeFormPage";
import LetCodeAlertPage from "../page-objects/letCodeAlertPage";
import LetCodeWindowsTabs from "../page-objects/letCodeWindowsTabsPage";
import LetCodeFramePage from "../page-objects/letCodeFramePage";
import LetCodeTablePage from "../page-objects/letCodeTablePage";

export class PageManager{
    private readonly page:Page;
    private readonly letCodeFormPage:LetCodeFormPage
    private readonly letCodeAlertPage:LetCodeAlertPage
    private readonly letCodeWindowsTabs:LetCodeWindowsTabs
    private readonly letCodeFramePage:LetCodeFramePage
    private readonly letCodeTablePage: LetCodeTablePage

    constructor(page:Page){
        this.page = page
        this.letCodeFormPage = new LetCodeFormPage(this.page)
        this.letCodeAlertPage = new LetCodeAlertPage(this.page)
        this.letCodeWindowsTabs = new LetCodeWindowsTabs(this.page)
        this.letCodeFramePage = new LetCodeFramePage(this.page)
        this.letCodeTablePage = new LetCodeTablePage(this.page)
    }

    navigateToFormPage(){
        return this.letCodeFormPage
    }

    navigateToAlertPage(){
        return this.letCodeAlertPage
    }

    navigateToWindowsTabPage(){
        return this.letCodeWindowsTabs
    }

    navigateToFramePage(){
        return this.letCodeFramePage
    }

    navigateToTablePage(){
        return this.letCodeTablePage
    }
}