import * as React from "react";
import Clock, { ClockSettings } from "./Clock";
import Countdown, { CountdownSettings } from "./Countdown";
import Quote, { QuoteSettings } from "./Quote";
import Counter, { CounterSettings } from "./Counter";
import NoteNavigator, { NoteNavigatorSettings } from "./NoteNavigator";
import { HelperFunctions } from "./types/HelperFunctions";
import { WidgetSettings } from "./types/Widgets";

export const Widget = ({ settings, helperFunctions, leafId }: WidgetProps) => {
	if (settings.type === "clock") {
		return <Clock settings={settings as ClockSettings} />;
	}

	if (settings.type === "quote") {
		return <Quote settings={settings as QuoteSettings} />;
	}

	if (settings.type === "countdown") {
		return <Countdown settings={settings as CountdownSettings} />;
	}

	if (settings.type === "counter") {
		return (
			<Counter
				settings={settings as CounterSettings}
				helperFunctions={helperFunctions}
				leafId={leafId}
			/>
		);
	}

	if (settings.type === "navigator") {
		return (
			<NoteNavigator
			   settings={settings as NoteNavigatorSettings} 
			   app={app}
			 />
		);
	}

	return (
		<code>
			Widgets: Wrong settings. <br /> Available widgets: "clock", "quote",
			"countdown", "counter", "navigator"
		</code>
	);
};

export interface WidgetProps {
	settings: WidgetSettings;
	helperFunctions: HelperFunctions;
	leafId: string;
}
