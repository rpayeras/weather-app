import { render, screen } from "@testing-library/react";
import { ForecastHourlyCol } from "./ForecastHourlyCol";

describe("Testing ForecastNow component", () => {
  const data = {
    hour: "10:00",
    icon: "test.jpg",
    text: "clear",
    date: "25/06/2020",
    temp: 10,
  };

  test("should render", () => {
    render(<ForecastHourlyCol {...data} />);

    expect(screen.getByText(data.hour)).toBeInTheDocument();
    expect(screen.getByText(data.temp + "º")).toBeInTheDocument();
  });
});
