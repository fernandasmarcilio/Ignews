import { render, screen, fireEvent } from "@testing-library/react";
import { mocked } from 'jest-mock';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { SubscribeButton } from ".";

jest.mock("next-auth/react")
jest.mock("next/router")

describe("SubscribeButton component", () => {
  it("renders correctly", () => {
    const useSessioMocked = mocked(useSession)
    useSessioMocked.mockReturnValueOnce({ data: null, status: 'unauthenticated' });

    render(
      <SubscribeButton />
    );

    expect(screen.getByText("Subscribe now")).toBeInTheDocument();
  });

  it("redirects user to sign in when not authenticated", () => {
    const useSessioMocked = mocked(useSession)
    useSessioMocked.mockReturnValueOnce({ data: null, status: 'unauthenticated' });

    const signInMocked = mocked(signIn);

    render(
      <SubscribeButton />
    );

    const subscribeButton = screen.getByText("Subscribe now")

    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled()
  });

  it("redirects user to posta when already has a subscription", () => {
    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any)

    const mockedDataSession = {
      expires: 'fake-expires',
      user: {
        name: "John Doe",
        email: "john@example.com"
      },
      activeSubscription: 'fake-subscription'
    }

    const useSessioMocked = mocked(useSession)
    useSessioMocked.mockReturnValueOnce({ 
      data: mockedDataSession, 
      status: 'authenticated' 
    });

    render(
      <SubscribeButton />
    );

    const subscribeButton = screen.getByText("Subscribe now")

    fireEvent.click(subscribeButton)

    expect(pushMock).toHaveBeenCalledWith('/posts')
  });
});
