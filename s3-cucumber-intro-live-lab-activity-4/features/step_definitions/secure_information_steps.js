const { Given, When, Then } = require("@cucumber/cucumber")

let state = {
  isLoggedIn: false,
  confirmationPopupAppeared: false,
}

Given("I am logged in", function () {
  state.isLoggedIn = true
})

When('I click on "Log Out"', function () {
  if (state.isLoggedIn) {
    state.confirmationPopupAppeared = true
  }
})

Then("a confirmation popup should appear", function () {
  if (!state.confirmationPopupAppeared) {
    throw new Error("Confirmation popup did not appear")
  }
})

When("I click on {word} in the pop-up", function (response) {
  if (!state.confirmationPopupAppeared) {
    throw new Error("No confirmation popup to interact with");
  }

  state.isLoggedIn = response === "yes" ? false : state.isLoggedIn
  state.confirmationPopupAppeared = false
})

Then("I am logged out", function () {
  if (state.isLoggedIn) {
    throw new Error("User is still logged in")
  }
})

Then("I remain logged in", function () {
  if (!state.isLoggedIn) {
    throw new Error("User is not logged in")
  }
})
