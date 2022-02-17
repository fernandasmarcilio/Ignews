import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { stripe } from "../../services/stripe";
import Home, { getStaticProps } from "../../pages/index";

jest.mock("next-auth/react", () => {
  return {
    useSession() {
      return [null, false]
    }
  }
})
jest.mock("next/router")
jest.mock("../../services/stripe")

describe("Home page", () => {
  it("renders correctly", () => {
    const productMocked = {
      priceId: 'faek-price-id',
      amount: 'R$10,00'
    }
    
    render(
      <Home product={productMocked} />
    );

    expect(screen.getByText("for R$10,00 month")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const retrieveStripePricesMocked = mocked(stripe.prices.retrieve)
    retrieveStripePricesMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000,
    } as any)

    const response = await getStaticProps({})
    
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-id',
            amount: '$10.00',
          }
        }
      })
    )

  });

});
