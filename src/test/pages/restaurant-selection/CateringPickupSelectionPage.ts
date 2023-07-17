class CateringPickupSelectionPage {
    get cateringPickupButton() {
        return ('[data-cy="Catering Pickup"]')
    }

    get locationSearchInputTextField() {
        return ('[data-cy="LocationSearch"]')
    }

    get findRestaurantsButton() {
        return ('[data-cy="FindRestaurants"]');
    }

    get myRestaurantsButton() {
        return ('[data-cy="MyRestaurants"]');
    }

    get selectRestaurantButton() {
        return ('[data-cy="SelectThisRestaurant"]')
    }

    get dateDropDown() {
        return ('[data-cy="DatePickerWrapper"]')
    }

    get dateSelectionBtns() {
        const currentCell = new Date().getDate().toString()
        return ("//button[normalize-space()='"+currentCell +"']")
    }

    get datePickerSelectorBtn() {
        return ('.date-picker-selector')
    }

    get timeDropDown() {
        return ('[data-cy="TimeSelectionDropdown"]')
    }

    get timeSelectionBtns() {
        return ('//option[@value="13:00"]')
    }

    get continueBtn() {
        return ('[data-cy="Continue"]')
    }

    async selectTime() {
       // await this.timeDropDown.click();
        // await this.timeSelectionBtns.waitForClickable({
        //     timeOutMessage: "Time selection was never clickable"
        // })
        // var dropdownSize = this.timeSelectionBtns.length;
        // console.log(dropdownSize);
       // await this.timeSelectionBtns[1].click();
    }
}

export default new CateringPickupSelectionPage()