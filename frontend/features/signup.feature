Feature: Should not be a duplicate user
    As User wants to Signup
    User Login details should be unique
    So that Userinformation will be Uniquely Identified and Secured
    Scenario: Signup when user enter details
        Given User Want to register as a new user
        When User Enter the details
        Then User Should see User registered successfully
    Scenario: Cannot Signup when user already exists
        Given User is trying to register
        When User entered the same details and trying to register
        Then User should see User already exists - please log in 
