// logout.test.js

// Describe is a Jest method for containing one or more related tests.
// Here, we are beginning a test suite for "Logout functionality."
describe("Logout functionality", () => {
  // Before each test runs, Jest will execute this code.
  // We set the innerHTML of the document's body to represent the HTML
  // we expect to see when the component (or page) is rendered.
  // This is a simplified version of the DOM we are testing.
  document.body.innerHTML = `
    <span id="status">Logged in</span> <!-- A status indicator showing the user is logged in -->
    <button id="logoutButton">Logout</button> <!-- A logout button that users will click to initiate the logout process -->
    <div id="confirmationPopup" style="display: none;">
      Are you sure you want to logout? <!-- A confirmation popup that is hidden by default -->
      <button id="confirmLogout">Yes</button> <!-- Button to confirm the logout action -->
      <button id="cancelLogout">No</button> <!-- Button to cancel the logout action -->
    </div>
  `;

  // We then require the JavaScript file that contains the functionality we're testing.
  // This line imports the logic for the logout process, which should connect the DOM elements above
  // with the appropriate event handlers.
  require("./logout");

  // 'it' is another Jest method for defining an individual test case.
  // This test will check if the confirmation popup is displayed when the logout button is clicked.
  it("should display a confirmation popup when logout is clicked", () => {
    // We retrieve the logout button from the DOM using its ID.
    const logoutButton = document.getElementById("logoutButton");
    // We simulate a click event on the logout button.
    // This is where we test the functionality that should show the confirmation popup.
    logoutButton.click();

    // We retrieve the confirmation popup from the DOM using its ID.
    const confirmationPopup = document.getElementById("confirmationPopup");
    // We then use 'expect' to assert that the style.display property of the confirmation popup
    // should not be 'none'. If our logout functionality works correctly, the click event above
    // should have triggered code that changes this property, making the popup visible.
    expect(confirmationPopup.style.display).not.toBe("none");
  });
});
