import { useContext } from "react";
import { ForecastContext } from "../context/forecast/ForecastContext";
import { ForecastDailyList } from "./forecast/ForecastDailyList";
import { ForecastHourlyList } from "./forecast/ForecastHourlyList";
import { ForecastNow } from "./forecast/ForecastNow";
import { Header } from "./header/Header";

export const PageForecast = () => {
  const { locations, current, hourly, daily } = useContext(ForecastContext);

  return (
    <main className="layout day">
      <Header location={locations[0]} />
      {!current ? <div>Loading...</div> : <ForecastNow data={current} />}
      {!daily ? <div>Loading...</div> : <ForecastDailyList data={daily} />}
      {!hourly ? <div>Loading...</div> : <ForecastHourlyList data={hourly} />}
      <div style={{ height: "100vh" }}></div>
    </main>
  );
};
