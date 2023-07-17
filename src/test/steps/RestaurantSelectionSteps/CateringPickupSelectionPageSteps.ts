import { Given,When,Then, setDefaultTimeout } from "@cucumber/cucumber"
import {chromium,Page,Browser} from "@playwright/test"
import OverlaysCommonAppInteractions from "../../pages/Overlays+CommonAppInteractions"
import GetStartedPage from "../../pages/GetStartedPage"
import CateringPickupSelectionPage from "../../pages/restaurant-selection/CateringPickupSelectionPage";
import { pageFixture } from "../../configs/pageFixture";

setDefaultTimeout(60 * 1000 * 2);


       
         Given('I am accessing the site as a guest and select the {string} option on the {string} page', async function (string, string2) {
           console.log("Opening Browser:"+process.env.BROWSER )
           await pageFixture.page.goto("https://order.chick-fil-astage.com/get-started", {timeout:60000});
           await pageFixture.page.locator(OverlaysCommonAppInteractions.acceptCookiesButton).click()
           await pageFixture.page.locator(GetStartedPage.cateringButton).click();
         });

  
       

         Given('I select {string} option on the Catering page', async function (string) { 
           
           await pageFixture.page.locator(CateringPickupSelectionPage.cateringPickupButton).click();
         });

   
       

         Given('I select location {string}', async function (string) {
            await pageFixture.page.locator(CateringPickupSelectionPage.locationSearchInputTextField).type("@03351");
            await pageFixture.page.locator(CateringPickupSelectionPage.findRestaurantsButton).click();
            await pageFixture.page.locator(CateringPickupSelectionPage.selectRestaurantButton).click();
            
            
         });

   
       

         Given('I select a date', async function () {
          await pageFixture.page.locator(CateringPickupSelectionPage.dateDropDown).isVisible();
          await pageFixture.page.locator(CateringPickupSelectionPage.dateDropDown).click();
          await pageFixture.page.locator(CateringPickupSelectionPage.dateSelectionBtns).click()

          console.log("Ended date selection");
         });

 

         Given('I select a time', async function () {
           await pageFixture.page.locator(CateringPickupSelectionPage.timeDropDown).click()
           await pageFixture.page.locator(CateringPickupSelectionPage.timeDropDown).selectOption({index:1})
           await pageFixture.page.locator(CateringPickupSelectionPage.continueBtn).click()

          console.log("Ended time selection");
         });
   
       

         Given('I checkout as a Catering guest with a mastercard', async function () {    
           
         });

   
       

         When('the order is bumped', async function () {
           
         });


       

         Then('The order is complete', async function () {
           
         });