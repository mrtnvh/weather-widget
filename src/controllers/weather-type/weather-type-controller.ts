import { ReactiveController, ReactiveControllerHost } from "lit";
import { weatherInterpretationCodes } from "./weather-interpretation-codes";

export class WeatherTypeController implements ReactiveController {
  // @ts-ignore
  constructor(private host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }

  getPeriod(date: string) {
    try {
      const dateObj = new Date(date);
      return dateObj.getHours() > 6 && dateObj.getHours() < 18 ? "day" : "night";
    } catch (error) {
      console.error(error);
      return;
    }
  }

  getType({ code, date }: { code: number; date: string }) {
    const period = this.getPeriod(date);
    if (!period) return;
    return weatherInterpretationCodes[code][period];
  }

  hostConnected() {
    // Do nothing
  }

  hostDisconnected() {
    // Do nothing
  }
}
