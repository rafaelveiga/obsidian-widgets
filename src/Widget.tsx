import * as React from "react";
import Clock from "./Clock";
import Countdown from "./Countdown";
import Quote from "./Quote";

export const Widget = ({ settings }) => {
	if (settings.type === "clock") {
		return <Clock settings={settings} />;
	}

	if (settings.type === "quote") {
		return <Quote settings={settings} />;
	}

	if (settings.type === "countdown") {
		return <Countdown settings={settings} />;
	}

	return <code>Wrong Settings</code>;
};
