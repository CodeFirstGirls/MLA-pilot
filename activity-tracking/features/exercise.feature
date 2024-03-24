Feature: Exercise Management

   Scenario: Add an exercise
    Given I have no exercises
    When I add an exercise
    Then the exercise should be added to my list

  Scenario: Get all exercises
    Given I have an exercise
    When I get all exercises
    Then I should see my exercise in the list