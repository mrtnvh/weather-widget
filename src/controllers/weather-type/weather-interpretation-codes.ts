type WeatherInterpretationCodes = Record<number, Record<"day" | "night", Record<"description" | "icon", string>>>;

export const weatherInterpretationCodes: WeatherInterpretationCodes = {
  0: {
    day: {
      description: "Sunny",
      icon: "fluent:weather-sunny-48-filled",
    },
    night: {
      description: "Clear",
      icon: "fluent:weather-moon-48-filled",
    },
  },
  1: {
    day: {
      description: "Mainly Sunny",
      icon: "fluent:weather-sunny-48-filled",
    },
    night: {
      description: "Mainly Clear",
      icon: "fluent:weather-moon-48-filled",
    },
  },
  2: {
    day: {
      description: "Partly Cloudy",
      icon: "fluent:weather-partly-cloudy-day-48-filled",
    },
    night: {
      description: "Partly Cloudy",
      icon: "fluent:weather-partly-cloudy-night-48-filled",
    },
  },
  3: {
    day: {
      description: "Cloudy",
      icon: "fluent:weather-cloudy-48-filled",
    },
    night: {
      description: "Cloudy",
      icon: "fluent:weather-cloudy-48-filled",
    },
  },
  45: {
    day: {
      description: "Foggy",
      icon: "fluent:weather-fog-48-filled",
    },
    night: {
      description: "Foggy",
      icon: "fluent:weather-fog-48-filled",
    },
  },
  48: {
    day: {
      description: "Foggy",
      icon: "fluent:weather-fog-48-filled",
    },
    night: {
      description: "Foggy",
      icon: "fluent:weather-fog-48-filled",
    },
  },
  51: {
    day: {
      description: "Light Drizzle",
      icon: "fluent:weather-drizzle-48-filled",
    },
    night: {
      description: "Light Drizzle",
      icon: "fluent:weather-drizzle-48-filled",
    },
  },
  53: {
    day: {
      description: "Drizzle",
      icon: "fluent:weather-drizzle-48-filled",
    },
    night: {
      description: "Drizzle",
      icon: "fluent:weather-drizzle-48-filled",
    },
  },
  55: {
    day: {
      description: "Heavy Drizzle",
      icon: "fluent:weather-drizzle-48-filled",
    },
    night: {
      description: "Heavy Drizzle",
      icon: "fluent:weather-drizzle-48-filled",
    },
  },
  56: {
    day: {
      description: "Light Freezing Drizzle",
      icon: "fluent:weather-drizzle-48-filled",
    },
    night: {
      description: "Light Freezing Drizzle",
      icon: "fluent:weather-drizzle-48-filled",
    },
  },
  57: {
    day: {
      description: "Freezing Drizzle",
      icon: "fluent:weather-drizzle-48-filled",
    },
    night: {
      description: "Freezing Drizzle",
      icon: "fluent:weather-drizzle-48-filled",
    },
  },
  61: {
    day: {
      description: "Light Rain",
      icon: "fluent:weather-rain-48-filled",
    },
    night: {
      description: "Light Rain",
      icon: "fluent:weather-rain-48-filled",
    },
  },
  63: {
    day: {
      description: "Rain",
      icon: "fluent:weather-rain-48-filled",
    },
    night: {
      description: "Rain",
      icon: "fluent:weather-rain-48-filled",
    },
  },
  65: {
    day: {
      description: "Heavy Rain",
      icon: "fluent:weather-rain-48-filled",
    },
    night: {
      description: "Heavy Rain",
      icon: "fluent:weather-rain-48-filled",
    },
  },
  66: {
    day: {
      description: "Freezing Rain",
      icon: "fluent:weather-rain-snow-48-filled",
    },
    night: {
      description: "Freezing Rain",
      icon: "fluent:weather-rain-snow-48-filled",
    },
  },
  67: {
    day: {
      description: "Freezing Rain",
      icon: "fluent:weather-rain-snow-48-filled",
    },
    night: {
      description: "Freezing Rain",
      icon: "fluent:weather-rain-snow-48-filled",
    },
  },
  71: {
    day: {
      description: "Light Snow",
      icon: "fluent:weather-snow-48-filled",
    },
    night: {
      description: "Light Snow",
      icon: "fluent:weather-snow-48-filled",
    },
  },
  73: {
    day: {
      description: "Snow",
      icon: "fluent:weather-snow-48-filled",
    },
    night: {
      description: "Snow",
      icon: "fluent:weather-snow-48-filled",
    },
  },
  75: {
    day: {
      description: "Heavy Snow",
      icon: "fluent:weather-snow-48-filled",
    },
    night: {
      description: "Heavy Snow",
      icon: "fluent:weather-snow-48-filled",
    },
  },
  77: {
    day: {
      description: "Snow Grains",
      icon: "fluent:weather-snow-shower-day-48-filled",
    },
    night: {
      description: "Snow Grains",
      icon: "fluent:weather-snow-shower-night-48-filled",
    },
  },
  80: {
    day: {
      description: "Light Showers",
      icon: "fluent:weather-rain-showers-day-48-filled",
    },
    night: {
      description: "Light Showers",
      icon: "fluent:weather-rain-showers-night-48-filled",
    },
  },
  81: {
    day: {
      description: "Showers",
      icon: "fluent:weather-rain-showers-day-48-filled",
    },
    night: {
      description: "Showers",
      icon: "fluent:weather-rain-showers-night-48-filled",
    },
  },
  82: {
    day: {
      description: "Heavy Showers",
      icon: "fluent:weather-rain-showers-day-48-filled",
    },
    night: {
      description: "Heavy Showers",
      icon: "fluent:weather-rain-showers-night-48-filled",
    },
  },
  85: {
    day: {
      description: "Snow Showers",
      icon: "fluent:weather-snow-shower-day-48-filled",
    },
    night: {
      description: "Snow Showers",
      icon: "fluent:weather-snow-shower-night-48-filled",
    },
  },
  86: {
    day: {
      description: "Snow Showers",
      icon: "fluent:weather-snow-shower-day-48-filled",
    },
    night: {
      description: "Snow Showers",
      icon: "fluent:weather-snow-shower-night-48-filled",
    },
  },
  95: {
    day: {
      description: "Thunderstorm",
      icon: "fluent:weather-thunderstorm-48-filled",
    },
    night: {
      description: "Thunderstorm",
      icon: "fluent:weather-thunderstorm-48-filled",
    },
  },
  96: {
    day: {
      description: "Thunderstorm With Hail",
      icon: "fluent:weather-thunderstorm-48-filled",
    },
    night: {
      description: "Thunderstorm With Hail",
      icon: "fluent:weather-thunderstorm-48-filled",
    },
  },
  99: {
    day: {
      description: "Thunderstorm With Hail",
      icon: "fluent:weather-thunderstorm-48-filled",
    },
    night: {
      description: "Thunderstorm With Hail",
      icon: "fluent:weather-thunderstorm-48-filled",
    },
  },
};
