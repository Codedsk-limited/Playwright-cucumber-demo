class CateringMenuPage {
    get traysBtn() {
        return ('[data-cy="OLO_TRAYS"]')
    }

    get nuggetTraysBtn() {
        return ('[data-cy="NUGGET_TRAYS"]')
    }

    get largeBtn() {
        return ('[data-cy="ItemSize-L"]')
    }

    get addToOrderBtn() {
        return ('[data-cy="AddToOrder"]')
    }

    get skipSaucesBtn() {
        return ('[data-cy="PrimaryConfirmButton"]')
    }

    get cartBtn() {
        return ('[class="sc-duSInm irvHin sc-bfabSb iZVaWv"]')
    }
}

export default new CateringMenuPage()
