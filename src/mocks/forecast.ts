// https://open-meteo.com/

import { DailyForecast, HourlyForecast } from "../controllers/forecast/types";

export const hourlyForecast: HourlyForecast = {
  latitude: 51.32,
  longitude: 4.94,
  generationtime_ms: 0.5179643630981445,
  utc_offset_seconds: 3600,
  timezone: "Europe/Berlin",
  timezone_abbreviation: "CET",
  elevation: 26.0,
  current_weather: {
    temperature: 2.4,
    windspeed: 10.0,
    winddirection: 49.0,
    weathercode: 0,
    time: "2023-03-01T20:00",
  },
  hourly_units: {
    time: "iso8601",
    temperature_2m: "°C",
    precipitation_probability: "%",
    weathercode: "wmo code",
  },
  hourly: {
    time: [
      "2023-05-10T00:00",
      "2023-05-10T01:00",
      "2023-05-10T02:00",
      "2023-05-10T03:00",
      "2023-05-10T04:00",
      "2023-05-10T05:00",
      "2023-05-10T06:00",
      "2023-05-10T07:00",
      "2023-05-10T08:00",
      "2023-05-10T09:00",
      "2023-05-10T10:00",
      "2023-05-10T11:00",
      "2023-05-10T12:00",
      "2023-05-10T13:00",
      "2023-05-10T14:00",
      "2023-05-10T15:00",
      "2023-05-10T16:00",
      "2023-05-10T17:00",
      "2023-05-10T18:00",
      "2023-05-10T19:00",
      "2023-05-10T20:00",
      "2023-05-10T21:00",
      "2023-05-10T22:00",
      "2023-05-10T23:00",
    ],
    temperature_2m: [
      12.9, 12.7, 12.8, 12.8, 12.8, 12.3, 12.6, 13.0, 13.2, 14.3, 14.8, 15.2, 14.9, 15.5, 16.0, 15.6, 14.6, 14.6, 13.5,
      13.3, 13.0, 12.9, 12.7, 12.5,
    ],
    precipitation_probability: [
      55, 54, 53, 52, 40, 28, 16, 16, 16, 16, 39, 61, 84, 86, 88, 90, 91, 93, 94, 92, 89, 87, 87, 87,
    ],
    weathercode: [0, 0, 0, 0, 0, 0, 0, 3, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
};

// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin

export const dailyForecast: DailyForecast = {
  latitude: 52.52,
  longitude: 13.419998,
  generationtime_ms: 1.3270378112792969,
  utc_offset_seconds: 7200,
  timezone: "Europe/Berlin",
  timezone_abbreviation: "CEST",
  elevation: 38.0,
  daily_units: {
    time: "iso8601",
    weathercode: "wmo code",
    temperature_2m_max: "°C",
    temperature_2m_min: "°C",
  },
  daily: {
    time: ["2023-05-10", "2023-05-11", "2023-05-12", "2023-05-13", "2023-05-14", "2023-05-15", "2023-05-16"],
    weathercode: [3, 3, 3, 2, 3, 63, 61],
    temperature_2m_max: [22.6, 21.8, 21.3, 21.4, 20.9, 16.1, 15.9],
    temperature_2m_min: [9.6, 11.3, 10.7, 11.0, 11.1, 12.4, 11.7],
  },
};
