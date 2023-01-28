import * as React from "react";
import Clock from "./Clock";

export const Widget = ({ settings }) => {
	console.log(settings);

	if (settings.type === "clock") {
		return <Clock settings={settings} />;
	}

	return <strong>Wrong Settings</strong>;
};
