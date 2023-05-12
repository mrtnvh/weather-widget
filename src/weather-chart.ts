import Color from "colorjs.io";
import "iconify-icon";
import { LitElement, html } from "lit";
import { Ref, createRef, ref } from "lit/directives/ref.js";
import { customElement, property } from "lit/decorators.js";
import { Chart, ChartConfiguration } from "chart.js/auto";

@customElement("weather-chart")
export class WeatherChart extends LitElement {
  chartRef: Ref<HTMLCanvasElement> = createRef();

  @property({ type: Array }) data: Array<{ key: string; value: number }> | undefined = undefined;
  @property({ type: String }) backgroundColorBase: string | undefined = undefined;
  @property({ type: Boolean }) inverse: boolean = false;

  getGradient(canvas: HTMLCanvasElement, baseColor: string) {
    const startColor = new Color(baseColor);
    const endColor = new Color(baseColor);

    startColor.lch.l = 100;
    startColor.lch.c = 50;

    const context = canvas.getContext("2d");
    const { width, height } = canvas.getBoundingClientRect();
    const gradient = context?.createLinearGradient(0, 0, width, height);

    gradient?.addColorStop(0, startColor.toString({ format: "rgb" }));
    gradient?.addColorStop(1, endColor.toString({ format: "rgb" }));

    return gradient;
  }

  firstUpdated() {
    const $chart = this.chartRef.value;
    const data = this.data
      ?.filter((_item, index) => index % 3 === 0)
      .map((item) => ({ ...item, value: item.value * (this.inverse ? -1 : 1) }));

    if ($chart && data) {
      const backgroundColor = this.getGradient($chart, this.backgroundColorBase || "#555555");

      const config: ChartConfiguration = {
        type: "line",
        data: {
          labels: data.map((item) => item.key),
          datasets: [
            {
              data: data.map((item) => item.value),
              borderWidth: 0,
              backgroundColor,
              fill: this.inverse ? "end" : "start",
              tension: 0.33,
            },
          ],
        },
        options: {
          onResize: (ctx) => {
            ctx.data.datasets?.forEach((dataset) => {
              console.log();
              dataset.backgroundColor = this.getGradient(ctx.canvas, this.backgroundColorBase || "#555555");
            });
          },
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            point: {
              radius: 0,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            filler: {
              propagate: false,
            },
            tooltip: {
              callbacks: {
                label: (ctx) => `${Number(ctx.raw) * (this.inverse ? -1 : 1)}`,
              },
            },
          },
          interaction: {
            intersect: false,
          },
          scales: {
            x: {
              display: false,
            },
            y: {
              display: false,
            },
          },
        },
      };

      new Chart($chart, config);
    }
  }

  render() {
    return html` <canvas ${ref(this.chartRef)}></canvas>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "weather-chart": WeatherChart;
  }
}
