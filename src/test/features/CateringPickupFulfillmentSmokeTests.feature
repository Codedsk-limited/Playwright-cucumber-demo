# Created by Ibraheem on 05/05/2023
Feature: Guest Catering Pickup Order and Fulfillment

    As a user, I am able to submit and complete a Catering Pickup order using PWO

    @CateringPickup @Critical @SmokeTest @Regression @DWO-T519
    Scenario: Complete a Catering Pickup Order
    Given I am accessing the site as a guest and select the 'Catering' option on the 'Get Started' page
    And I select 'Catering Pickup' option on the Catering page
    And I select location '03351'
    And I select a date
    And I select a time
    And I add a 'Nugget Tray' from the 'Trays' category to my order and view my order
    And I select guest checkout for catering
    And I checkout as a Catering guest with a mastercard
    When the order is bumped
    Then The order is complete
