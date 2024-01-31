Feature: Validating log out

  Scenario: Confirmation Screen Appears When Log Out Pressed
    Given I am logged in
    When I click on "Log Out"
    Then a confirmation popup should appear

  Scenario: If Validated, User is Logged Out
    Given I am logged in
    When I click on "Log Out"
    And I click on yes in the pop-up
    Then I am logged out

  Scenario: If Log Out Cancelled, User remains Logged In
    Given I am logged in
    When I click on "Log Out"
    And I click on no in the pop-up
    Then I remain logged in


