//Importing required functions from the cucumber library
const { Given, When, Then } = require("@cucumber/cucumber");

//Declaring the variables

//To check the success of registration
let isRegistrationSuccessful = false;

//A variable to Store the Registration result
let registrationResult;

//Function to Simulate User Registration
const registerUser = (username, password) => {
    //To check whether entered username and password or just Username is matching with the Existing User and Existing Password
    if (!((username === "existingUser" && password === "existingPassword") || (username === "existingUser"))) {
        //If it doesn't match then mark as Registartion Successful
        isRegistrationSuccessful = true;
        //return success
        return { success: true };
    } else {
        //If entered username and password matches with the existing username or password
        isRegistrationSuccessful = false;
        //returns failure with an error message
        return { success: false, error: "User already exists - please log in" };
    }
};

//Step :Given User Want to register as a new user
Given("User Want to register as a new user", function () {
    //setting up user details for registration
    this.user = {
        username: "newUser",
        password: "newPassword",
    };
});

//Step :When User Enter the details
When("User Enter the details", function () {
    //Performing user registration based on the details provided
    registrationResult = registerUser(this.user.username, this.user.password);
});

//Step :Then User Should see User registered successfully
Then("User Should see User registered successfully", function () {
    // Checking if the registration was expected to be successful
    if (!registrationResult.success || !isRegistrationSuccessful) {
    // If not, throw an error indicating the unexpected result
        throw new Error("Registration failed, but it should have succeeded");
    }
});
  
//Step :Given User is trying to register
Given("User is trying to register", function () {
    //setting up user details for registration
    this.user = {
        username: "existingUser",
        password: "existingPassword",
    };
});

//Step :When User entered the same details and trying to register
When("User entered the same details and trying to register", function () {
    //Performing user registration based on the details provided
    registrationResult = registerUser(this.user.username, this.user.password);
});

//Step :Then User should see User already exists - please log in
Then("User should see User already exists - please log in", function () {
    // Checking if the registration was expected to fail 
    if (registrationResult.success || isRegistrationSuccessful) {
        // If not, throws an error indicating the unexpected result
        throw new Error("User registered successfully,but it should have failed");
    }
});

