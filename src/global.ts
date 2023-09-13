const form = document.querySelector("form")!;
const weatherWidget = document.querySelector("weather-widget")!;

const geoLocationResult = {
  results: [
    {
      id: 2785141,
      name: "Turnhout",
      latitude: 51.32254,
      longitude: 4.94471,
      elevation: 29.0,
      feature_code: "PPLA3",
      country_code: "BE",
      admin1_id: 3337388,
      admin2_id: 2803136,
      admin3_id: 2785140,
      admin4_id: 2785142,
      timezone: "Europe/Brussels",
      population: 44000,
      postcodes: ["2300"],
      country_id: 2802361,
      country: "Belgium",
      admin1: "Flanders",
      admin2: "Antwerp Province",
      admin3: "Arrondissement Turnhout",
      admin4: "Turnhout",
    },
  ],
  generationtime_ms: 0.41604042,
};

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const city = ((e.target as HTMLFormElement).elements.namedItem("city") as HTMLInputElement).value;
  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
    .then((response) => response.json())
    .then((result: typeof geoLocationResult) => {
      const { latitude, longitude } = result.results[0];
      weatherWidget.longitude = longitude;
      weatherWidget.latitude = latitude;
    });
});
