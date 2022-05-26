export const codes = {
  sunny: [1000],
  cloudy: [1006, 1009],
  partlyCloudy: [1003],
  partlyShower: [1063, 1066, 1069, 1072, 1150, 1153, 1168, 1171],
  mist: [1030],
  rain: [
    1153, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1204, 1240, 1243,
    1246, 1249, 1252,
  ],
  rainNight: [
    1153, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1204, 1240, 1243,
    1246, 1249, 1252,
  ],
  storm: [1273, 1282],
  stormShowers: [1273, 1276, 1279],
  snow: [1210, 1216, 1219, 1213, 1222, 1225, 1237, 1255, 1258, 1261, 1264],
  snowNight: [1210, 1216, 1219, 1213, 1222, 1225, 1237, 1255, 1258, 1261, 1264],
  snowSunny: [1210, 1216, 1219, 1213, 1222, 1225, 1237, 1255, 1258, 1261, 1264],
  wind: [1117],
  thunder: [1087],
  fog: [1030, 1135, 1147],
};

export default class Weather {
  constructor() {
    this.apiUrl = "https://weatherapi-com.p.rapidapi.com";

    this.headers = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        "X-RapidAPI-Key": "65c246da9emsh9c69001cb59f3b4p170657jsnf399c7887465",
      },
    };
  }

  async getForecast(query, daysForecast = 3) {
    const url = `${this.apiUrl}/forecast.json?q=${query}&days=${daysForecast}&lang=en`;
    const response = await fetch(url, this.headers);
    const data = await response.json();
    return data;
  }

  async getLocationByIp() {
    const url = `${this.apiUrl}/ip.json?q=auto%3Aip`;
    const response = await fetch(url, this.headers);
    const data = await response.json();
    return data;
  }

  async getAutocompleteLocation(query) {
    const url = `${this.apiUrl}/search.json?q=${query}`;
    const response = await fetch(url, this.headers);
    const data = await response.json();
    return data;
  }

  getLocation() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            resolve(position);
          },
          (err) => {
            console.log(err);

            reject(err);
          },
          options
        );
      }
    });
  }

  getFormatCurrentForecast(data) {
    const { condition } = data;
    const { text, code } = condition;
    let icon = null;

    const {
      temp_c: tempC,
      is_day: isDay,
      humidity,
      cloud,
      uv,
      wind_kph: windKph,
      wind_degree: windDegree,
      wind_dir: windDir,
      pressure_mb: pressureMb,
      last_updated: lastUpdated,
      precip_mm: precipMm,
    } = data;

    for (let i in codes) {
      if (codes[i].includes(code)) {
        icon = `/assets/weather/${i}.json`;
      }
    }

    return {
      tempC: Math.trunc(tempC),
      icon,
      text,
      isDay,
      humidity,
      cloud,
      uv,
      windKph,
      windDegree,
      windDir,
      pressureMb,
      lastUpdated,
      precipMm,
    };
  }

  getFormatDailyForecast({ forecastday }) {
    let forecast = [];

    forecastday.forEach((item) => {
      const { day, date } = item;
      const { condition, daily_will_it_rain, daily_will_it_snow } = day;
      const { icon, text } = condition;

      forecast.push({
        date,
        icon,
        text,
        willRain: daily_will_it_rain,
        willSnow: daily_will_it_snow,
        maxTempC: Math.trunc(day.maxtemp_c),
        minTempC: Math.trunc(day.mintemp_c),
      });
    });

    return forecast;
  }

  getFormatHourlyForecast({ forecastday: data }) {
    let forecast = [];

    for (let item of data) {
      if (forecast.length === 0) {
        forecast = item.hour.slice(new Date().getHours());
        continue;
      }

      for (let hour of item.hour) {
        if (forecast.length === 24) break;

        forecast.push(hour);
      }
    }

    forecast = forecast.map((hour) => {
      const { time, condition, temp_c, will_it_rain, will_it_snow } = hour;
      let text, icon;

      if (condition) {
        text = condition.text;
        icon = condition.icon;
      }

      return {
        date: time,
        text: text || "",
        icon: icon || "",
        hour: time.split(" ")[1],
        temp: Math.trunc(temp_c),
        willRain: will_it_rain,
        willSnow: will_it_snow,
      };
    });

    return forecast;
  }
}
