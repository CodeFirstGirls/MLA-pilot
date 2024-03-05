

Feature: Reminder Settings Feature

  Scenario: Navigating to Reminder Settings Section
    Given I am logged into the fitness app
    When I navigate to the "Settings" or "Reminders" section
    Then I should see an option to set reminders or notifications

  Scenario: Configuring Reminder Settings
    Given I have selected the option to set reminders or notifications
    When I configure the reminder settings
    Then I should be able to choose the frequency and timing of reminders (e.g., daily, weekly, specific days, specific times)

  Scenario: Receiving and Handling Reminder Notifications
    Given I have configured the reminder settings
    When It is time for a reminder
    Then I should receive a notification on my device prompting me to engage in my planned workout or reminding me of my fitness goals

  Scenario: Opening App from Reminder Notification
    Given I receive a reminder notification
    When I tap on the notification
    Then It should open the fitness app to the relevant section (e.g., workout planner, goal tracker)

  Scenario: Dismissing Reminder Notification
    Given I receive a reminder notification
    When I dismiss the notification
    Then It should be removed from my device's notification tray
