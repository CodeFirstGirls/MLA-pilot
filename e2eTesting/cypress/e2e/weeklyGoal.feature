Feature: WeeklyGoal
  Scenario: Add Exercise
    Given I am a logged in user
    When I add an exercise
    Then it should contribute to my weekly goal

  Scenario: Update Weekly Goal
    Given I am a logged in user
    When I add an exercise
    And I edit my weekly goal target
    Then the UI should reflect my updated target

  Scenario: Complete Weekly Goal
    Given I am a logged in user
    When I complete my weekly goal
    Then my weekly goal should show as complete
