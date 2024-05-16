import { ClockSettings } from "src/Clock";
import { CountdownSettings } from "src/Countdown";
import { CounterSettings } from "src/Counter";
import { QuoteSettings } from "src/Quote";

export type WidgetType = "quote" | "clock" | "countdown" | "counter";

export type WidgetSettings =
	| ClockSettings
	| QuoteSettings
	| CountdownSettings
	| CounterSettings;
