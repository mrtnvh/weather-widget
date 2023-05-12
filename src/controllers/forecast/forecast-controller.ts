import { ReactiveController, ReactiveControllerHost } from "lit";
import { hourlyForecast as hourlyForecastMock } from "../../mocks/forecast";
import { dailyForecast as dailyForecastMock } from "../../mocks/forecast";
import { DailyForecast, HourlyForecast } from "./types";
import { StatusRenderer, Task } from "@lit-labs/task";

export class ForecastController implements ReactiveController {
  #hourlyForecast: HourlyForecast | undefined = hourlyForecastMock;
  #dailyForecast: DailyForecast | undefined = dailyForecastMock;

  #baseUrl = "https://api.open-meteo.com/v1/forecast";
  // #latitude: number | undefined = undefined;
  // #longitude: number | undefined = undefined;
  #task!: Task;

  constructor(private host: ReactiveControllerHost/* , latitude?: number, longitude?: number */) {
    (this.host = host).addController(this);
    // this.#latitude = latitude;
    // this.#longitude = longitude;

    // this.#task = new Task<[number, number], HourlyForecast>(
    //   host,
    //   async ([latitude, longitude]: [number, number]) => {
    //     return this.getHourlyForecast(latitude, longitude);
    //   },
    //   () => [this.#latitude!, this.#longitude!]
    // );
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

  // getDailyForecast() {
  //   this.dailyForecast = dailyForecastMock;
  //   this.host.requestUpdate();
  // }

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

  render(renderFunctions: StatusRenderer<unknown>) {
    return this.#task.render(renderFunctions);
  }

  hostConnected() {
    // Do nothing
  }

  hostDisconnected() {
    // Do nothing
  }
}
