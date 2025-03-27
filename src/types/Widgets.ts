import { ClockSettings } from "src/Clock";
import { CountdownSettings } from "src/Countdown";
import { CounterSettings } from "src/Counter";
import { QuoteSettings } from "src/Quote";
import { NoteNavigatorSettings } from "src/NoteNavigator";

export type WidgetType = "quote" | "clock" | "countdown" | "counter" | "navigator";

export type WidgetSettings =
	| ClockSettings
	| QuoteSettings
	| CountdownSettings
	| CounterSettings
	| NoteNavigatorSettings;
