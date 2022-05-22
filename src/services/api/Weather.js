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
}
