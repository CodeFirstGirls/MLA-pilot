Feature: Exercise Logging Feature

Scenario: Navigating to Log Exercise Section 
  Given I am logged into the fitness app
  When I navigate to the "Log Exercise" section
  Then I should see options to input exercise type, description, duration and date 
  
Scenario: Logging an Exercise
  Given I am logged into the fitness app
  When I input the exercise type, description, duration, and date
  Then The information should be saved successfully

Scenario: Reviewing Exercise Log
  Given I have logged exercises
  When I review my exercise log
  Then I should see a detailed list including exercise type, description, duration, and date for each entry   