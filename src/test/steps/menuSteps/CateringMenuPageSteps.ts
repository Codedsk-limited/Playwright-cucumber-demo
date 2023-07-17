import { pageFixture } from "../../configs/pageFixture";
import CateringMenuPage from "../../pages/menu/CateringMenuPage";

const {Given, When, Then} = require('@cucumber/cucumber');


Given('I add a {string} from the {string} category to my order and view my order', async function (string, string2) {
    
    await pageFixture.page.locator(CateringMenuPage.traysBtn).click()
    await pageFixture.page.locator(CateringMenuPage.nuggetTraysBtn).click()
    //await pageFixture.page.locator(CateringMenuPage.largeBtn).click()
    await pageFixture.page.locator(CateringMenuPage.addToOrderBtn).click()
    await pageFixture.page.locator(CateringMenuPage.skipSaucesBtn).click()
    await pageFixture.page.locator(CateringMenuPage.cartBtn).click()
    console.log("Item selection completed")

});