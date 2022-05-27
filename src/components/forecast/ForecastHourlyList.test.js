import { render, screen } from "@testing-library/react";
import { ForecastHourlyList } from "./ForecastHourlyList";

describe("Testing ForecastHourlyList", () => {
  test("should render", () => {
    const data = [
      {
        hour: "10:00",
        icon: "test.jpg",
        text: "clear",
        date: "25/06/2020",
        temp: 10,
      },
      {
        hour: "12:00",
        icon: "test.jpg",
        text: "clear",
        date: "25/06/2020",
        temp: 12,
      },
    ];

    render(<ForecastHourlyList data={data} />);

    expect(screen.getByText(data[0].hour)).toBeInTheDocument();
    expect(screen.getByText(data[1].hour)).toBeInTheDocument();
  });
});
