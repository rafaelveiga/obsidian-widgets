import * as React from "react";
import Clock, { ClockSettings } from "./Clock";
import Countdown, { CountdownSettings } from "./Countdown";
import Quote, { QuoteSettings } from "./Quote";
import Counter, { CounterSettings } from "./Counter";
import { HelperFunctions } from "./types/HelperFunctions";

export const Widget = ({ settings, helperFunctions, leafId }: WidgetProps) => {
	if (settings.type === "clock") {
		return <Clock settings={settings} />;
	}

	if (settings.type === "quote") {
		return <Quote settings={settings} />;
	}

	if (settings.type === "countdown") {
		return <Countdown settings={settings} />;
	}

	if (settings.type === "counter") {
		return (
			<Counter
				settings={settings}
				helperFunctions={helperFunctions}
				leafId={leafId}
			/>
		);
	}

	return (
		<code>
			Widgets: Wrong settings. <br /> Available widgets: "clock", "quote",
			"countdown", "counter"
		</code>
	);
};

export interface WidgetProps {
	settings:
		| QuoteSettings
		| CountdownSettings
		| ClockSettings
		| CounterSettings;
	helperFunctions: HelperFunctions;
	leafId: string;
}
