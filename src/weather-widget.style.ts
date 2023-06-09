import { css } from "lit";

export const WeatherWidgetStyle = css`
  :host {
    --wthrwdgt-clr-warm-darker: oklch(33% 0.168 41.77);
    --wthrwdgt-clr-warm-dark: oklch(42.64% 0.082 41.6);
    --wthrwdgt-clr-warm: oklch(72% 0.1816742802712447 41.7840358294143);
    --wthrwdgt-clr-warm-light: oklch(80% 0.085 41.77);
    --wthrwdgt-clr-warm-lighter: oklch(87.86% 0.056 43.42);
    --wthrwdgt-clr-warm-lightest: oklch(95% 0.033 41.77);

    --wthrwdgt-clr-cool: oklch(66.51% 0.131 268.45);
    --wthrwdgt-clr-cool-dark: oklch(33% 0.131 268.065);

    --wthrwdgt-background-color: var(--wthrwdgt-clr-warm-lighter);
    --wthrwdgt-text-color: var(--wthrwdgt-clr-warm-darker);
    --wthrwdgt-font-size-base: 1em;
    --wthrwdgt-font-weight-base: 400;
    --wthrwdgt-font-weight-bold: 800;
    --wthrwdgt-line-height: 1.5;
    --wthrwdgt-border-radius: 0.25rem;
    --wthrwdgt-border-width: 0px;
    --wthrwdgt-border: var(--wthrwdgt-border-width) solid var(--wthrwdgt-clr-warm-light);
    --wthrwdgt-spacing: 1.5rem;

    container: weather-widget / size;
  }

  .weather-widget {
    background-color: var(--wthrwdgt-background-color);
    background: linear-gradient(145deg,var(--wthrwdgt-clr-warm-lightest ), var(--wthrwdgt-clr-warm-lighter));
    color: var(--wthrwdgt-text-color);
    font-size: var(--wthrwdgt-font-size-base);
    font-weight: var(--wthrwdgt-font-weight-base);
    line-height: var(--wthrwdgt-line-height);
    border-radius: var(--wthrwdgt-border-radius);
    border: var(--wthrwdgt-border);

    inline-size: calc(100% - (var(--wthrwdgt-border-width) * 2));
    block-size: calc(100% - (var(--wthrwdgt-border-width) * 2));

    display: grid;
    grid-template-columns: var(--wthrwdgt-grid-template-columns, auto);
    grid-template-rows: var(--wthrwdgt-grid-template-rows, auto);
    grid-template-areas: var(--wthrwdgt-grid-template-areas, "weather-type");

    @container (inline-size >= 275px) {
      --wthrwdgt-grid-template-columns: 1fr 1fr;
      --wthrwdgt-show-temperature: true;
      --wthrwdgt-grid-template-areas: "current-temperature weather-type";
    }

    @container (inline-size >= 275px) and (block-size >= 200px) {
      --wthrwdgt-show-hourly-temperature: true;
      --wthrwdgt-grid-template-rows: 9rem 2fr;
      --wthrwdgt-grid-template-areas: "current-temperature weather-type" "hourly-temperature hourly-temperature";
    }

    @container (inline-size >= 275px) and (block-size >= 300px) {
      --wthrwdgt-show-hourly-precipitation: true;
      --wthrwdgt-grid-template-rows: 9rem 3fr 1fr;
      --wthrwdgt-grid-template-areas: "current-temperature weather-type" "hourly-temperature hourly-temperature"
        "hourly-precipitation hourly-precipitation";
    }

    @container (inline-size >= 400px) and (block-size >= 350px) {
      --wthrwdgt-show-upcoming-days: true;
      --wthrwdgt-grid-template-rows: 9rem 4fr 2fr 3fr;
      --wthrwdgt-grid-template-areas: "current-temperature weather-type" "hourly-temperature hourly-temperature"
        "hourly-precipitation hourly-precipitation" "upcoming-days upcoming-days";
    }
  }

  .location {
    display: none;
    grid-area: location;

    @container style(--wthrwdgt-show-location: true) {
      display: flex;
    }
  }

  .date {
    display: none;
    grid-area: date;

    @container style(--wthrwdgt-show-date: true) {
      display: flex;
    }
  }

  /* Current weather type */

  .current__weather-type {
    color: var(--wthrwdgt-clr-warm);
    grid-area: weather-type;
    position: relative;
    display: flex;
    place-content: center;
    place-items: center;
    container: current-weather-type / size;
  }

  .current__weather-type__icon {
    object-fit: contain;
    object-position: center center;
    block-size: 100%;
    inline-size: auto;

    @container (block-size <= 100px) {
      position: absolute;
      inset: 0;
    }

    @container (block-size >= 100px) {
      max-block-size: 66cqmax;
    }
  }

  /* Temperature */

  .current__temperature {
    display: none;
    grid-area: current-temperature;
    container-type: inline-size;
    place-content: center;
    place-items: center;
    font-weight: var(--wthrwdgt-font-weight-bold);
    font-size: clamp(1em, 7.5cqmax, 3.75em);

    @container style(--wthrwdgt-show-temperature: true) {
      display: flex;
    }
  }

  /* Hourly temperature */

  .hourly__temperature__chart {
    display: none;
    grid-area: hourly-temperature;
    position: relative;

    @container style(--wthrwdgt-show-hourly-temperature: true) {
      display: flex;
    }

    & weather-chart,
    & svg {
      position: absolute;
      inline-size: 100%;
      block-size: 100%;
    }
  }

  /* Hourly precipitation */

  .hourly__precipitation__chart {
    display: none;
    grid-area: hourly-precipitation;
    position: relative;
    margin-block-start: -2px;

    @container style(--wthrwdgt-show-hourly-precipitation: true) {
      display: flex;
    }

    & weather-chart,
    & svg {
      position: absolute;
      inline-size: 100%;
      block-size: 100%;
    }
  }

  /* Upcoming days */

  .upcoming__days {
    display: none;
    grid-area: upcoming-days;
    container: upcoming-days / size;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: 1fr;
    grid-gap: calc(var(--wthrwdgt-spacing) / 4);
    align-items: center;

    @container style(--wthrwdgt-show-upcoming-days: true) {
      display: grid;
      padding: var(--wthrwdgt-spacing);
      text-align: center;
      line-height: 1.25;
    }
  }

  .upcoming__day__temperature {
    font-weight: var(--wthrwdgt-font-weight-bold);
  }

  .upcoming__day__weather-type {
    display: none;
    color: var(--wthrwdgt-clr-warm);
    max-block-size: calc(var(--wthrwdgt-spacing) * 3);

    @container (block-size >= 7.5rem) {
      display: flex;
    }
  }

  /* Icons */
`;
