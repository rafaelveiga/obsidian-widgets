import { ClockSettings } from "src/Clock";
import { CountdownSettings } from "src/Countdown";
import { CountupSettings } from "src/Countup";
import { CounterSettings } from "src/Counter";
import { QuoteSettings } from "src/Quote";

export type WidgetType = "quote" | "clock" | "countdown" | "countup" |"counter";

export type WidgetSettings =
	| ClockSettings
	| QuoteSettings
	| CountdownSettings
	| CountupSettings
	| CounterSettings;
