import { ReactiveControllerHost } from "lit";
import { hourlyForecast as hourlyForecastMock } from "../../mocks/forecast";
import { dailyForecast as dailyForecastMock } from "../../mocks/forecast";
import { DailyForecast, HourlyForecast } from "./types";
import { StatusRenderer, Task } from "@lit-labs/task";

export class ForecastController {
  #hourlyForecast: HourlyForecast | undefined = hourlyForecastMock;
  #dailyForecast: DailyForecast | undefined = dailyForecastMock;

  #baseUrl = "https://api.open-meteo.com/v1/forecast";
  #latitude: number | undefined = undefined;
  #longitude: number | undefined = undefined;
  #task!: Task;

  constructor(private host: ReactiveControllerHost) {
    this.host = host;

    this.#task = new Task<
      [number, number],
      Promise<{ hourlyForecast: HourlyForecast | undefined; dailyForecast: DailyForecast | undefined }>
    >(
      host,
      async ([latitude, longitude]: [number, number]) => {
        if (latitude === undefined || longitude === undefined)
          return { hourlyForecast: undefined, dailyForecast: undefined };
        const hourlyForecast = await this.getHourlyForecast(latitude, longitude);
        const dailyForecast = await this.getDailyForecast(latitude, longitude);
        return {
          hourlyForecast,
          dailyForecast,
        };
      },
      () => [this.#latitude!, this.#longitude!]
    );
  }

  async getHourlyForecast(latitude: number, longitude: number): Promise<HourlyForecast> {
    const url = new URL(this.#baseUrl);
    url.searchParams.append("latitude", latitude.toString());
    url.searchParams.append("longitude", longitude.toString());
    url.searchParams.append("hourly", "temperature_2m,precipitation_probability");
    url.searchParams.append("current_weather", "true");
    url.searchParams.append("forecast_days", "1");
    return fetch(url.toString()).then((response) => response.json());
  }

  getDailyForecast(latitude: number, longitude: number): Promise<DailyForecast> {
    // return Promise.resolve(dailyForecastMock
    // https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin);
    const url = new URL(this.#baseUrl);
    url.searchParams.append("latitude", latitude.toString());
    url.searchParams.append("longitude", longitude.toString());
    url.searchParams.append("daily", "weathercode,temperature_2m_max,temperature_2m_min");
    url.searchParams.append("timezone", "Europe/Berlin");
    return fetch(url.toString()).then((response) => response.json());
  }

  get hourlyForecast() {
    return this.#hourlyForecast;
  }
  set hourlyForecast(value: HourlyForecast | undefined) {
    this.#hourlyForecast = value;
    this.host.requestUpdate();
  }

  get dailyForecast() {
    return this.#dailyForecast;
  }
  set dailyForecast(value: DailyForecast | undefined) {
    this.#dailyForecast = value;
    this.host.requestUpdate();
  }

  get latitude() {
    return this.#latitude;
  }
  set latitude(value: number | undefined) {
    this.#latitude = value;
  }

  get longitude() {
    return this.#longitude;
  }
  set longitude(value: number | undefined) {
    this.#longitude = value;
  }

  render(renderFunctions: StatusRenderer<any>) {
    return this.#task.render(renderFunctions);
  }

  hostConnected() {
    // Do nothing
  }

  hostDisconnected() {
    // Do nothing
  }
}
