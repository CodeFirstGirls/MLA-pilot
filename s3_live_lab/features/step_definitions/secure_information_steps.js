const { Given, When, Then } = require("@cucumber/cucumber");

let isLoggedIn = false;

const isUserLoggedIn = () => {
  return isLoggedIn;
};

const logout = () => {
  isLoggedIn = false;
};

const login = (username, password) => {
  if (username === "correctUser" && password === "correctPassword") {
    isLoggedIn = true;
    return { success: true };
  } else {
    isLoggedIn = false;
    return { success: false, error: "Incorrect username or password" };
  }
};

Given("I am a registered user", function () {
  this.user = {
    username: "correctUser",
    password: "correctPassword",
  };
  logout();
});

When("I log in with correct credentials", function () {
  this.loginResult = login(this.user.username, this.user.password);
});

Then("I should see my personal information", function () {
  if (!this.loginResult.success) {
    throw new Error("Login failed, but it should have succeeded.");
  }
});

Given("I am a logged-out user", function () {
  logout();
});

When("I try to access personal information", function () {
  this.accessResult = isUserLoggedIn();
});

Then("I should not see any personal information", function () {
  if (this.accessResult) {
    throw new Error("User is logged in, but should be logged out.");
  }
});

When("I log in with incorrect credentials", function () {
  this.loginResult = login("wrongUser", "wrongPassword");
});

Then("access to personal information should be denied", function () {
  if (this.loginResult.success) {
    throw new Error("Access granted with incorrect credentials.");
  }
});

Then("I should see an error message for incorrect login", function () {
  if (!this.loginResult.error) {
    throw new Error("Error message not displayed for incorrect login.");
  }
});
