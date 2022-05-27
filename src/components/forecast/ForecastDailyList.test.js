import { render, screen } from "@testing-library/react";
import { ForecastDailyList } from "./ForecastDailyList";

describe("Testing ForecastDailyList", () => {
  test("should render", () => {
    const data = [
      {
        date: "25/06/2020",
        icon: "test.jpg",
        text: "clear",
        maxTempC: 10,
        minTempC: 0,
      },
      {
        date: "26/06/2020",
        icon: "test.jpg",
        text: "clear",
        maxTempC: 12,
        minTempC: 1,
      },
    ];

    render(<ForecastDailyList data={data} />);

    expect(screen.getByText(data[0].date)).toBeInTheDocument();
    expect(
      screen.getByText(data[0].maxTempC + "º / " + data[0].minTempC + "º")
    ).toBeInTheDocument();
    expect(screen.getByText(data[1].date)).toBeInTheDocument();
    expect(
      screen.getByText(data[1].maxTempC + "º / " + data[1].minTempC + "º")
    ).toBeInTheDocument();
  });
});
