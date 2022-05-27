import { render, screen } from "@testing-library/react";
import { ForecastProvider } from "../../context/forecast/ForecastProvider";
import { Header } from "./Header";

describe("Testing Header component", () => {
  test("should render", () => {
    render(
      <ForecastProvider>
        <Header />
      </ForecastProvider>
    );

    expect(screen.getByAltText("reload")).toBeInTheDocument();
  });
});
