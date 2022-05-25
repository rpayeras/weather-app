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

  async getForecast(city, daysForecast = 3) {
    const url = `${this.apiUrl}/forecast.json?q=${city}&days=${daysForecast}&lang=es`;
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

  getFormatCurrentForecast(data) {
    const { condition } = data;
    const { text, icon } = condition;

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
    } = data;

    return {
      tempC,
      text,
      icon,
      isDay,
      humidity,
      cloud,
      uv,
      windKph,
      windDegree,
      windDir,
      pressureMb,
      lastUpdated,
    };
  }

  getFormatDailyForecast({ forecastday }) {
    let forecast = [];

    forecastday.forEach((item) => {
      const { day, date } = item;
      const { condition } = day;
      const { icon, text } = condition;

      forecast.push({
        date,
        icon,
        text,
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
      const { time, condition, temp_c } = hour;
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
      };
    });

    return forecast;
  }
}
