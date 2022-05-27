import { render, screen } from "@testing-library/react";
import { ForecastDailyRow } from "./ForecastDailyRow";

describe("Testing ForecastDailyRow", () => {
  test("should render", () => {
    const data = {
      date: "25/06/2020",
      icon: "test.jpg",
      text: "clear",
      maxTempC: 10,
      minTempC: 0,
    };

    render(<ForecastDailyRow {...data} />);

    expect(screen.getByText(data.date)).toBeInTheDocument();
    expect(
      screen.getByText(data.maxTempC + "º / " + data.minTempC + "º")
    ).toBeInTheDocument();
  });
});
