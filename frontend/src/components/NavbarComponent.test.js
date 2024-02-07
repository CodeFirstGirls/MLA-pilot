import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import NavbarComponent from "./navbar"; // Adjust the import path as necessary

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useNavigate: () => mockNavigate,
}));

describe("NavbarComponent", () => {
  it("shows a confirmation popup on logout attempt", () => {
    // Mock the window.confirm method
    window.confirm = jest.fn().mockImplementation(() => true);

    const mockOnLogout = jest.fn();
    const { getByText } = render(<NavbarComponent onLogout={mockOnLogout} />);

    // Simulate clicking the logout link
    fireEvent.click(getByText(/logout/i));

    // Assert that window.confirm was called
    expect(window.confirm).toHaveBeenCalledWith("Do you want to logout?");

    // Assert that the mockOnLogout function was called since window.confirm is mocked to return true
    expect(mockOnLogout).toHaveBeenCalled();
  });
});
