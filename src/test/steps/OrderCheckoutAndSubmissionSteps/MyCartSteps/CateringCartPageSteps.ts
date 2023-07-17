import { expect } from '@playwright/test';
import { pageFixture } from '../../../configs/pageFixture';
import CateringCartPage from '../../../pages/order_submission/myCart/CateringCartPage';
const {Given, When, Then} = require('@cucumber/cucumber');


Given('I select guest checkout for catering', async function () {
   
    await pageFixture.page.locator(CateringCartPage.checkOutBtn).click()
    await pageFixture.page.locator(CateringCartPage.guestCheckOutButton).click()
    await expect(pageFixture.page).toHaveURL("https://order.chick-fil-astage.com/order/guest-checkout")
    console.log("Guest Successfully Check-out")

});