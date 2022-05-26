export const ForecastActionTypes = {
  SET_CURRENT: "[Forecast] Set current",
  SET_HOURLY: "[Forecast] Set hourly",
  SET_DAILY: "[Forecast] Set daily",
  SET_LOCATION: "[Forecast] Add Location",
  SET_LOADING: "[Forecast] Loading",
};

export const forecastReducer = (state, action) => {
  switch (action.type) {
    case ForecastActionTypes.SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case ForecastActionTypes.SET_DAILY:
      return {
        ...state,
        daily: action.payload,
      };
    case ForecastActionTypes.SET_HOURLY:
      return {
        ...state,
        hourly: action.payload,
      };
    case ForecastActionTypes.SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case ForecastActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
