// Importing necessary functions from the cucumber library
const { Given, When, Then } = require("@cucumber/cucumber") 

//Flag to track the User's Login Status
let isLoggedIn = false  

// Function to check if the user is logged in
const isUserLoggedIn = () => { 
    return isLoggedIn
}

// Function to simulate user logout
const Logout = () => { 
    isLoggedIn = false 
}

// Function to simulate user Login
const Login = (username, password) => {
// To check whether entered username and password matches with correct credentials
     if (username === "correctUsername" && password === "correctPassword") { 
        // If correct, mark the user as logged in
        isLoggedIn = true
        // Return success response
         return { success: true } 
    } 
    else {
        // If username and password are wrong mark it as false
         isLoggedIn = false 
        // Return failure response
         return {success:false, error:"Incorrect username or password"}
    }

}

// Step :Given I am a Registered User
Given ("I am a Registered User",function(){
    // Setting up user details for a registered user and logging them out
    this.user = {
        username: "correctUsername",
        password: "correctPassword"
    };
    Logout();
});

// Step:When I log in with Correct Credentials
When ("I log in with Correct Credentials",function(){
    // Performing user login based on correct credentials
    this.loginResult = Login(this.user.username,this.user.password)
});

// Step:Then I should see my Information
Then ("I should see my Information",function(){
    // Checking if the login was expected to be successful
    if(!this.loginResult.success){
    // If not, throw an error indicating the unexpected result
        throw new Error("Login failed, but it should have succeeded")
    }
});

// Step:Given I am a logged-out user
Given ("I am a logged-out user",function(){
    Logout();
});

// Step:When I try to access personal information
When ("I try to access personal information",function(){
    // Checking if the user is logged in
    this.accessResult = isUserLoggedIn()
});

// Step:Then I should not see any personal information
Then ("I should not see any personal information",function(){
    // Checking if the user is expected to be logged out
    if(this.accessResult){
    // If not, throw an error indicating the unexpected result
        throw new Error("User is Loggedin, but should be loggedout")
    }
});



// Step:Given I am a registered user
Given('I am a registered user', function () {
    // Setting up user details for a registered user and logging them out
    this.user = { username: "registeredUser", password: "password" };
    Logout();
});

//Step:When I log in with incorrect credentials
When ("I log in with incorrect credentials",function(){
    // Performing user login based on incorrect credentials
    this.loginResult = Login("wronguser","WrongPassword")
});

//Step:Then access to personal information should be denied And I should see an error message for incorrect login
Then ("access to personal information should be denied And I should see an error message for incorrect login",function(){
    // Checking if the login was expected to fail
    if(this.loginResult.success){
    // If not, throw an error indicating the unexpected result
        throw new Error("Access granted with incorrect credentials")
    }
    if(!this.loginResult.error){
    // If not, throw an error indicating the missing error message
        throw new Error("Error message not displayed for incorrectlogin")
    }
});