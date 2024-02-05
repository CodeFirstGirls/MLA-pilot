// Function to show the confirmation popup
function showConfirmationPopup() {
  // First, we find the confirmation popup element by its ID.
  const confirmationPopup = document.getElementById("confirmationPopup");
  // Then, we change its display style to "block", which makes the element visible on the page.
  confirmationPopup.style.display = "block";
}

// Function to hide the confirmation popup
function hideConfirmationPopup() {
  // Again, we find the confirmation popup element by its ID.
  const confirmationPopup = document.getElementById("confirmationPopup");
  // This time, we change its display style to "none", which hides the element from the page.
  confirmationPopup.style.display = "none";
}

// Event listener for the logout button
// We find the logout button by its ID.
const logoutButton = document.getElementById("logoutButton");
// We then attach an event listener to this button that listens for "click" events.
// When the button is clicked, the showConfirmationPopup function will be called.
logoutButton.addEventListener("click", showConfirmationPopup);

// Event listeners for the confirm and cancel buttons in the confirmation popup
// We find the confirm logout button by its ID.
const confirmLogout = document.getElementById("confirmLogout");
// We attach an event listener that listens for "click" events.
// When the confirm logout button is clicked, an anonymous function is called.
confirmLogout.addEventListener("click", function () {
  // Inside this function, you would typically handle the logic to properly log out the user.
  // After handling the logout, we call hideConfirmationPopup to hide the confirmation popup.
  hideConfirmationPopup();
  // Here you might also redirect the user or perform other cleanup tasks.
});

// Similarly, we find the cancel logout button by its ID.
const cancelLogout = document.getElementById("cancelLogout");
// We attach an event listener that listens for "click" events.
// When the cancel logout button is clicked, the hideConfirmationPopup function is called,
// which hides the confirmation popup without logging out the user.
cancelLogout.addEventListener("click", hideConfirmationPopup);
