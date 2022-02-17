import { render, screen, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import { AsyncTest } from '.'

describe("AsyncTest component", () => {
  it("renders correctly", async () => {
    render(
      <AsyncTest />
    );

    screen.logTestingPlaygroundURL()

    // screen.get -> procura elemento de forma sícrona, se não encontrar da erro
    // screen.query-> procura elemento de forma sícrona, se não encontrar não vai dar erro
    // screen.find-> procura elemento, se não encontrar vai ficar observando/monitando por um tempo. Se não for encontrado vai dar erro.

    expect(screen.getByText("Hello AsynTest Component")).toBeInTheDocument();
    // expect(await screen.findByText("Button")).toBeInTheDocument();
    await waitFor(() => {
      return expect(screen.getByText("Button")).toBeInTheDocument();
    })

    await waitFor(() => {
      return expect(screen.queryByText('Button2')).not.toBeInTheDocument();
    })
    // await waitForElementToBeRemoved(screen.queryByText('Button2'))
  });

});
