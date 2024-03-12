import * as React from "react";
import Clock, { ClockSettings } from "./Clock";
import Countdown, { CountdownSettings } from "./Countdown";
import Quote, { QuoteSettings } from "./Quote";
import NoteNavigator, { NoteNavigatorSettings } from "./NoteNavigator";
import { App } from "obsidian";

export const Widget = ({ settings, app }: WidgetProps) => {
	if (settings.type === "clock") {
		return <Clock />;
	}

	if (settings.type === "quote") {
		return <Quote settings={settings} />;
	}

	if (settings.type === "countdown") {
		return <Countdown settings={settings} />;
	}

	if (settings.type === "navigator") {
		return <NoteNavigator app={app} />;
	}

	return (
		<code>
			Widgets: Wrong settings. <br /> Available widgets: "clock", "quote",
			"countdown", "navigator"
		</code>
	);
};

interface WidgetProps {
	app: App;
	settings:
		| ClockSettings
		| CountdownSettings
		| QuoteSettings
		| NoteNavigatorSettings;
}
