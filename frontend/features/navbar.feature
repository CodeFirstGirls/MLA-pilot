Feature: NavbarComponent Functionality

  Scenario: User navigates to Track Exercise
    Given the user is on the home page
    When the user clicks on "Track New Exercise" in the navigation bar
    Then the user should be redirected to the Track Exercise page

  Scenario: User navigates to Statistics
    Given the user is on the home page
    When the user clicks on "Statistics" in the navigation bar
    Then the user should be redirected to the Statistics page

  Scenario: User navigates to Weekly Journal
    Given the user is on the home page
    When the user clicks on "Weekly Journal" in the navigation bar
    Then the user should be redirected to the Weekly Journal page

  Scenario: User logs out
    Given the user is on the home page
    When the user clicks on "Logout" in the navigation bar
    Then the user should be logged out

  Scenario: User clicks on an invalid route
    Given the user is on the home page
    When the user clicks on an invalid link in the navigation bar
    Then an error should be logged, and the user remains on the home page