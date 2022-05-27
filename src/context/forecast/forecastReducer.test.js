import { ForecastActionTypes, forecastReducer } from "./forecastReducer";

const INITIAL_STATE = {
  location: "",
  hourly: [],
  daily: [],
  current: {},
  loading: false,
};

describe("Testing forecast reducer", () => {
  test("should return the initial state", () => {
    expect(forecastReducer(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
  });

  test("should handle SET_CURRENT", () => {
    expect(
      forecastReducer(INITIAL_STATE, {
        type: ForecastActionTypes.SET_CURRENT,
        payload: {
          test: "test",
        },
      })
    ).toEqual({
      ...INITIAL_STATE,
      current: {
        test: "test",
      },
    });
  });
});
