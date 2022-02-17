import { render, screen, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import { AsyncTest } from '.'

describe("AsyncTest component", () => {
  it("renders correctly", async () => {
    render(
      <AsyncTest />
    );

    expect(screen.getByText("Hello AsynTest Component")).toBeInTheDocument();
    // expect(await screen.findByText("Button")).toBeInTheDocument();
    await waitFor(() => {
      return expect(screen.getByText("Button")).toBeInTheDocument();
    })

    // await waitFor(() => {
    //   return expect(screen.queryByText('Button2')).not.toBeInTheDocument();
    // })
    await waitForElementToBeRemoved(screen.queryByText('Button2'))
  });

});
