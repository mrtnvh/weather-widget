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
    this.#forecastController = new ForecastController(this);
    this.#weatherTypeController = new WeatherTypeController(this);
  }

  @property({ type: Number }) longitude = 0;
  @property({ type: Number }) latitude = 0;
  @property({ type: String }) date: string | undefined = undefined;

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
    return this.#forecastController.render({
      complete: ({
        hourlyForecast,
        dailyForecast,
      }: {
        hourlyForecast: HourlyForecast;
        dailyForecast: DailyForecast;
      }) => {
        const colorWarm = getComputedStyle(this).getPropertyValue("--wthrwdgt-clr-warm-dark");
        const colorCool = getComputedStyle(this).getPropertyValue("--wthrwdgt-clr-cool-dark");
        const date = this.formatDate(this.date);
        if (!hourlyForecast || !date || !dailyForecast) return html`<div>Loading...</div>`;
        const _currentWeather = this.transformCurrentWeather(hourlyForecast);
        const _dailyForecast = this.transformDailyForecast(dailyForecast);

        return html`<div class="weather-widget">
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
            <!-- <weather-chart .data=${_currentWeather.hourlyTemperature} .backgroundColorBase=${colorWarm}></weather-chart> -->
            <svg viewBox="0 0 303 134" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M302.667 54.3307V133.787H0V25.41C12.5113 29.1607 24.2287 51.3387 35.3473 72.3847C46.2553 93.03 56.5873 112.586 66.528 112.586C79.51 112.586 87.5114 98.5353 95.6207 84.294C103.953 69.6627 112.399 54.8307 126.477 54.8307C140.653 54.8307 148.357 63.968 155.902 72.918C163.143 81.5067 170.239 89.9227 182.77 89.9227C193.697 89.9227 198.891 73.5233 204.843 54.7313C212.829 29.5187 222.178 0 248.567 0C267.359 0 273.848 14.4907 280.153 28.5727C285.427 40.3447 290.573 51.8313 302.667 54.3307Z"
                fill="url(#paint0_linear_201_31)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_201_31"
                  x1="300"
                  y1="8.5"
                  x2="-5.42372e-06"
                  y2="126.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#D5724B" />
                  <stop offset="1" stop-color="#F8CCBA" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <!-- Hourly precipitation -->
          <div class="hourly__precipitation__chart">
            <!-- <weather-chart
            .data=${_currentWeather.hourlyPrecipitation}
            inverse
            .backgroundColorBase=${colorCool}
          ></weather-chart> -->
            <svg viewBox="0 0 303 48" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path
                d="M82 16.5C47 16.5 34.5 48 0.5 48V0.5H303V43.5C265 43.5 254 11.5 224.5 11.5C187 11.5 183 33 152 33C121 33 117 16.5 82 16.5Z"
                fill="url(#paint0_linear_309_49)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_309_49"
                  x1="0.500002"
                  y1="0.820938"
                  x2="302.961"
                  y2="40.7138"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#AFBFF0" />
                  <stop offset="1" stop-color="#3156C3" />
                </linearGradient>
              </defs>
            </svg>
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
        </div>`;
      },
      initial: () => html`<p>Loading</p>`,
      pending: () => html`<p>Loading ${this.latitude} ${this.longitude}</p>`,
      error: (e: any) => html`<p>${e}</p>`,
    });
  }

  willUpdate() {
    this.#forecastController.latitude = this.latitude;
    this.#forecastController.longitude = this.longitude;
  }

  static styles = WeatherWidgetStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    "weather-widget": WeatherWidget;
  }
}
