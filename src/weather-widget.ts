import "iconify-icon";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ForecastController } from "./controllers/forecast/forecast-controller";
import { DailyForecast, HourlyForecast } from "./controllers/forecast/types";
import { WeatherTypeController } from "./controllers/weather-type/weather-type-controller";
import { WeatherWidgetStyle } from "./weather-widget.style";
import "./weather-chart";

@customElement("weather-widget")
export class WeatherWidget extends LitElement {
  #forecastController: ForecastController;
  #weatherTypeController: WeatherTypeController;

  constructor() {
    super();
    this.#forecastController = new ForecastController(this, /* Number(this.latitude), Number(this.longitude) */);
    this.#weatherTypeController = new WeatherTypeController(this);
  }

  @property({ type: Number }) longitude = 0;
  @property({ type: Number }) latitude = 0;
  @property({ type: String }) date: string | undefined = undefined;
  @property({ type: String }) city: string | undefined = undefined;
  @property({ type: String }) country: string | undefined = undefined;

  formatDate(
    date?: string,
    formatOptions: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
    }
  ) {
    if (!date) return undefined;
    try {
      return new Date(date).toLocaleDateString("default", formatOptions);
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  formatTime(date?: string) {
    if (!date) return undefined;
    try {
      return new Date(date).toLocaleTimeString("default", { hour: "numeric", minute: "numeric" });
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  transformCurrentWeather(hourlyForecast: HourlyForecast) {
    return {
      temperature: {
        value: hourlyForecast.current_weather.temperature,
        unit: hourlyForecast.hourly_units.temperature_2m,
      },
      hourlyTemperature: hourlyForecast.hourly.time.map((time, index) => ({
        key: this.formatTime(time),
        value: hourlyForecast.hourly.temperature_2m[index],
      })),
      hourlyPrecipitation: hourlyForecast.hourly.time.map((time, index) => ({
        key: this.formatTime(time),
        value: hourlyForecast.hourly.precipitation_probability[index],
      })),
      type: this.#weatherTypeController.getType({
        code: hourlyForecast.current_weather.weathercode,
        date: hourlyForecast.current_weather.time,
      }),
    };
  }

  transformDailyForecast(dailyForecast: DailyForecast) {
    return dailyForecast.daily.time.map((date, index) => {
      const weatherType = this.#weatherTypeController.getType({
        code: dailyForecast.daily.weathercode[index],
        date,
      });

      return {
        date: this.formatDate(date, { weekday: "short" }),
        maxTemperature: {
          value: dailyForecast.daily.temperature_2m_max[index],
          unit: dailyForecast.daily_units.temperature_2m_max,
        },
        minTemperature: {
          value: dailyForecast.daily.temperature_2m_min[index],
          unit: dailyForecast.daily_units.temperature_2m_min,
        },
        type: weatherType,
      };
    });
  }

  render() {
    const { city, country } = this;
    const { hourlyForecast, dailyForecast } = this.#forecastController;

    const colorWarm = getComputedStyle(this).getPropertyValue("--wthrwdgt-clr-warm-dark");
    const colorCool = getComputedStyle(this).getPropertyValue("--wthrwdgt-clr-cool-dark");

    const date = this.formatDate(this.date);
    if (!hourlyForecast || !date || !city || !country || !dailyForecast) return html`<div>Loading...</div>`;

    const _currentWeather = this.transformCurrentWeather(hourlyForecast);
    const _dailyForecast = this.transformDailyForecast(dailyForecast);

    return html`
      <div class="weather-widget">
        <!-- Location -->
        <div class="location">
          <span class="location__city">${this.city}</span>
          <span class="location__country">${this.country}</span>
        </div>

        <!-- Date -->
        <div class="date">${date}</div>

        <!-- Current weather type -->
        <div class="current__weather-type">
          ${!!_currentWeather.type &&
          html`
            <iconify-icon
              class="current__weather-type__icon"
              icon="${_currentWeather.type.icon}"
              aria-label=${_currentWeather.type.description}
              role="img"
              width="100%"
              height="100%"
            ></iconify-icon>
          `}
        </div>

        <!-- Current temperature -->
        <div class="current__temperature">
          <span class="current__temperature__value">${_currentWeather.temperature.value}</span>
          <span class="current__temperature__unit">${_currentWeather.temperature.unit}</span>
        </div>

        <!-- Hourly temperature -->
        <div class="hourly__temperature__chart">
          <weather-chart .data=${_currentWeather.hourlyTemperature} .backgroundColorBase=${colorWarm}></weather-chart>
        </div>

        <!-- Hourly precipitation -->
        <div class="hourly__precipitation__chart">
          <weather-chart
            .data=${_currentWeather.hourlyPrecipitation}
            inverse
            .backgroundColorBase=${colorCool}
          ></weather-chart>
        </div>

        <!-- Upcoming days -->
        <div class="upcoming__days">
          ${_dailyForecast &&
          _dailyForecast.map(
            (day) => html`
              <div class="upcoming__day">
                <div class="upcoming__day__weather-type">
                  ${day.type &&
                  html`
                    <iconify-icon
                      class="upcoming__day__weather-type__icon"
                      icon="${day.type.icon}"
                      aria-label="{day.type.description}"
                      role="img"
                      width="100%"
                      height="100%"
                    ></iconify-icon>
                  `}
                </div>
                <div class="upcoming__day__date">${day.date}</div>
                <div class="upcoming__day__temperature upcoming__day__temperature__max">
                  <span class="upcoming__day__temperature__value">${day.maxTemperature.value}</span>
                  <!-- <span class="upcoming__day__temperature__unit">${day.maxTemperature.unit}</span> -->
                </div>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }

  static styles = WeatherWidgetStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    "weather-widget": WeatherWidget;
  }
}
