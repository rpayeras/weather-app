import { useContext } from "react";
import { ForecastContext } from "../context/forecast/ForecastContext";
import { ForecastDailyList } from "./forecast/ForecastDailyList";
import { ForecastHourlyList } from "./forecast/ForecastHourlyList";
import { ForecastNow } from "./forecast/ForecastNow";
import { Header } from "./header/Header";

export const PageForecast = () => {
  const { location, current, hourly, daily } = useContext(ForecastContext);

  const { isDay } = current;

  return (
    <main className={`layout ${isDay ? "day" : "night"}`}>
      {!location ? <div>Loading...</div> : <Header />}
      <div className="container">
        {!current ? <div>Loading...</div> : <ForecastNow data={current} />}
        {!daily ? <div>Loading...</div> : <ForecastDailyList data={daily} />}
        {!hourly ? <div>Loading...</div> : <ForecastHourlyList data={hourly} />}
      </div>
    </main>
  );
};
