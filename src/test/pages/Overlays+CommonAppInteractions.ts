class OverlaysCommonAppInteractions {

    get chickenSpinner() {
        return ('[data-cy="LoadingOverlay"]');
    }

    get acceptCookiesButton() {
        return ("//button[@id='onetrust-accept-btn-handler']");
    }

    get mobileDevicePromptOkButton() {
        return ('button=Okay')
    }

    get yesImAtTheRestaurantButton() {
        return ('button*=restaurant')
    }

    get driveThruPickupOkButton() {
        return ('button=Okay')
    }

    // async waitForChickenSpinner() {
    //     if (await this.chickenSpinner.waitForDisplayed())
    //         await this.chickenSpinner.waitForDisplayed({reverse: true})
    // }

    get continueButton() {
        return ('button=Continue')
    }

}

export default new OverlaysCommonAppInteractions();