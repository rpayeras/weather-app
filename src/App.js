import { useEffect, useState } from "react";
import Weather from "./services/api/Weather";

const weather = new Weather();

function App() {
  const [locations, setLocations] = useState([]);
  const [currentForecast, setCurrentForecast] = useState({});
  const [forecast, setForecast] = useState({});

  useEffect(() => {
    if (locations.length === 0) {
      weather.getLocationByIp().then((data) => {
        setLocations([data]);
      });
    } else {
      const { city } = locations[0];

      weather
        .getForecast(city)
        .then((data) => {
          console.log(data);

          const { current, forecast } = data;
          console.log(current);

          setCurrentForecast(current);
          setForecast(forecast);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [locations]);

  const {
    temp_c: tempCentigrades,
    condition: currentCondition,
    is_day: isDay,
    humidity,
    cloud,
    uv,
    wind_kph: windKph,
    wind_degree: windDegree,
    wind_dir: windDir,
    pressure_mb: pressureMb,
    last_updated: lastUpdated,
  } = currentForecast;
  const { forecastday: forecastDay } = forecast;

  return (
    <main className="layout">
      <header>
        <div>{locations.length > 0 ? locations[0].city : "Locating..."}</div>
        <nav>Menu</nav>
      </header>
      {tempCentigrades && (
        <section class="forecast__current">
          <div>{tempCentigrades}</div>
          <div>{currentCondition.text}</div>
        </section>
      )}

      <section>
        <ul class="forecast__daily--list">
          {forecastDay && forecastDay.length
            ? forecastDay.map((item, idx) => (
                <li key={"daily-" + idx}>
                  <div>
                    <img
                      src={item.day.condition.icon}
                      alt={item.day.condition.text}
                    />
                  </div>
                  <div>{item.date}</div>
                  <div>
                    {Math.trunc(item.day.maxtemp_c)}º /{" "}
                    {Math.trunc(item.day.mintemp_c)}º
                  </div>
                </li>
              ))
            : "Loading forecast..."}
        </ul>
      </section>

      <section>
        <ul className="forecast__hourly--list">
          {forecastDay && forecastDay.length
            ? forecastDay[0].hour.map((item, hour) => (
                <li key={"hourly-" + hour}>
                  <div>{`${hour}:00`}</div>
                  <div>
                    <img src={item.condition.icon} alt={item.condition.text} />
                  </div>
                  <div>{item.date}</div>
                  <div>{Math.trunc(item.temp_c)}º</div>
                </li>
              ))
            : "Loading forecast..."}
        </ul>
      </section>
    </main>
  );
}

export default App;
