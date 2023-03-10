import * as React from "react";
import Clock from "./Clock";
import Countdown from "./Countdown";
import Quote from "./Quote";
import Weather from "./Weather";

export const Widget = ({ settings }) => {
	if (settings.type === "clock") {
		return <Clock />;
	}

	if (settings.type === "quote") {
		return <Quote settings={settings} />;
	}

	if (settings.type === "countdown") {
		return <Countdown settings={settings} />;
	}

	if (settings.type === "weather") {
		return <Weather settings={settings} />;
	}

	return (
		<code>
			Obsidian Widgets: Wrong Settings. <br /> Available widgets: "clock",
			"quote", "countdown", "weather"
		</code>
	);
};
