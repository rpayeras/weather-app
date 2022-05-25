import { useCallback, useEffect, useReducer } from "react";
import Weather from "../../services/api/Weather";
import { ForecastContext } from "./ForecastContext";
import { ForecastActionTypes, forecastReducer } from "./forecastReducer";

const INITIAL_STATE = {
  locations: [],
  hourly: [],
  daily: [],
  current: {},
};

const weather = new Weather();

export const ForecastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(forecastReducer, INITIAL_STATE);
  const { locations, forecast } = state;

  //Actions
  const refreshLocations = async () => {
    if (locations.length === 0) {
      try {
        const data = await weather.getLocationByIp();
        dispatch({ type: ForecastActionTypes.ADD_LOCATION, payload: [data] });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getForecast = async () => {
    const { city } = locations[0];

    const data = await weather.getForecast(city);

    const { current, forecast } = data;

    const dailyForecast = weather.getFormatDailyForecast(forecast);
    const currentForecast = weather.getFormatCurrentForecast(current);
    const hourlyForecast = weather.getFormatHourlyForecast(forecast);

    dispatch({
      type: ForecastActionTypes.SET_DAILY,
      payload: dailyForecast,
    });

    dispatch({
      type: ForecastActionTypes.SET_CURRENT,
      payload: currentForecast,
    });

    dispatch({
      type: ForecastActionTypes.SET_HOURLY,
      payload: hourlyForecast,
    });
  };

  useEffect(() => {
    refreshLocations();
  }, []);

  useEffect(() => {
    if (locations.length > 0) {
      getForecast();
    }
  }, [locations]);

  return (
    <ForecastContext.Provider
      value={{
        ...state,
        getForecast,
        refreshLocations,
      }}
    >
      {children}
    </ForecastContext.Provider>
  );
};
