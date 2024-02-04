Feature: Secure Information Access
  As a private person,
  I want my information secure
  So that only I have access to personal data

  Scenario: View information when logged in
    Given I am a registered user
    When I log in with correct credentials
    Then I should see my personal information

  Scenario: Cannot view information when logged out
    Given I am a logged-out user
    When I try to access personal information
    Then I should not see any personal information

  Scenario: Access denied with incorrect credentials
    Given I am a registered user
    When I log in with incorrect credentials
    Then access to personal information should be denied
    And I should see an error message for incorrect login
