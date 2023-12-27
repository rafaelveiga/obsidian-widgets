import * as React from "react";
import Clock from "./Clock";
import Countdown, { CountdownProps } from "./Countdown";
import Quote, { QuoteProps } from "./Quote";

export const Widget = ({ settings }: WidgetProps) => {
	if (settings.type === "clock") {
		return <Clock />;
	}

	if (settings.type === "quote") {
		return <Quote settings={settings} />;
	}

	if (settings.type === "countdown") {
		return <Countdown settings={settings} />;
	}

	return (
		<code>
			Obsidian Widgets: Wrong Settings. <br /> Available widgets: "clock",
			"quote", "countdown"
		</code>
	);
};

interface WidgetProps {
	settings: QuoteProps | CountdownProps;
}
