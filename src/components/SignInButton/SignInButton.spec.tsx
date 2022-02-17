import { render, screen } from "@testing-library/react";
import { mocked } from 'jest-mock';
import { useSession } from 'next-auth/react';
import { SignInButton } from ".";

jest.mock("next-auth/react")

describe("SignInButton component", () => {
  it("renders correctly when user is not authenticated", () => {
    const useSessioMocked = mocked(useSession)
    useSessioMocked.mockReturnValueOnce({ data: null, status: 'unauthenticated' });

    render(
      <SignInButton />
    );

    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
  });

  it("renders correctly when user is authenticated", () => {

    const mockedDataSession = {
      expires: 'fake-expires',
      user: {
        name: "John Doe",
        email: "john@example.com"
      }
    }

    const useSessioMocked = mocked(useSession)
    useSessioMocked.mockReturnValueOnce({ 
      data: mockedDataSession, 
      status: 'authenticated' 
    });

    render(
      <SignInButton />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

});
