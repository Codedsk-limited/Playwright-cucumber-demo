class GetStartedPage {

    get pickupButton() {
        return ('[data-cy="Pickup"]')
    }

    get deliveryButton() {
        return ('[data-cy="Delivery"]');
    }

    get cateringButton() {
        return ("//button[@data-cy='Catering']");
    }


}

export default new GetStartedPage();