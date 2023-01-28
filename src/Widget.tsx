import * as React from "react";
import Clock from "./Clock";
import Quote from "./Quote";

export const Widget = ({ settings }) => {
	if (settings.type === "clock") {
		return <Clock settings={settings} />;
	}

	if (settings.type === "quote") {
		return <Quote settings={settings} />;
	}

	return <code>Wrong Settings</code>;
};
