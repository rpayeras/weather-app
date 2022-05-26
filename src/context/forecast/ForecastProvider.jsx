import { useEffect, useReducer } from "react";
import Weather from "../../services/api/Weather";
import { ForecastContext } from "./ForecastContext";
import { ForecastActionTypes, forecastReducer } from "./forecastReducer";

const INITIAL_STATE = {
  location: "",
  hourly: [],
  daily: [],
  current: {},
  loading: false,
};

const weather = new Weather();

export const ForecastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(forecastReducer, INITIAL_STATE);
  const { location } = state;

  //Actions
  const refreshlocation = async (location = null) => {
    if (!location) {
      try {
        const { coords } = await weather.getLocation();

        if (coords) {
          const { latitude, longitude } = coords;
          const listLocations = await weather.getAutocompleteLocation(
            `${latitude},${longitude}`
          );
          location = listLocations[0];
        } else {
          location = await weather.getLocationByIp();
        }
      } catch (err) {
        console.log(err);
      }
    }

    dispatch({ type: ForecastActionTypes.SET_LOCATION, payload: location });
  };

  const getForecast = async () => {
    setLoading(true);

    const data = await weather.getForecast(`${location.lat}, ${location.lon}`);

    console.log(data);

    const { current, forecast, error } = data;

    if (error) return console.log(error);

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

    setLoading(false);
  };

  const setLoading = (loading) => {
    dispatch({ type: ForecastActionTypes.SET_LOADING, payload: loading });
  };

  const getAutocompleteLocation = async (city = "") => {
    const locations = await weather.getAutocompleteLocation(city);
    return locations;
  };

  useEffect(() => {
    refreshlocation();
  }, []);

  useEffect(() => {
    if (location) {
      getForecast();
    }
  }, [location]);

  return (
    <ForecastContext.Provider
      value={{
        ...state,
        getForecast,
        refreshlocation,
        getAutocompleteLocation,
      }}
    >
      {children}
    </ForecastContext.Provider>
  );
};
