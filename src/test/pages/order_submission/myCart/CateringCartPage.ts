import { pageFixture } from "../../../configs/pageFixture";

class CateringCartPage {
    get checkOutBtn() {
        return ('[data-cy="CheckOut"]');
    }

    get guestCheckOutButton() {
        return ('[data-cy="GuestCheckout"]');
    }

    get continueBtn() {
        return ('[data-cy="Continue"]');
    }

    get proceedToCheckoutBtn() {
        return ('[data-cy="ProceedToCheckout"]');
    }
   
}



export default new CateringCartPage()