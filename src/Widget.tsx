import * as React from "react";
import Clock, { ClockSettings } from "./Clock";
import Countdown, { CountdownSettings } from "./Countdown";
import Quote, { QuoteSettings } from "./Quote";
import NoteNavigator, { NoteNavigatorSettings } from "./NoteNavigator";
import { Vault } from "obsidian";

export const Widget = ({ settings, vault }: WidgetProps) => {
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
		return <NoteNavigator />;
	}

	return (
		<code>
			Widgets: Wrong settings. <br /> Available widgets: "clock", "quote",
			"countdown", "navigator"
		</code>
	);
};

interface WidgetProps {
	vault: Vault;
	settings:
		| ClockSettings
		| CountdownSettings
		| QuoteSettings
		| NoteNavigatorSettings;
}
