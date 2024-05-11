import * as React from "react";
import Clock, { ClockProps } from "./Clock";
import Countdown, { CountdownProps } from "./Countdown";
import Quote, { QuoteProps } from "./Quote";

export const Widget = ({
	settings,
}: QuoteProps | CountdownProps | ClockProps) => {
	if (settings.type === "clock") {
		return <Clock settings={settings} />;
	}

	if (settings.type === "quote") {
		return <Quote settings={settings} />;
	}

	if (settings.type === "countdown") {
		return <Countdown settings={settings} />;
	}

	return (
		<code>
			Widgets: Wrong settings. <br /> Available widgets: "clock", "quote",
			"countdown"
		</code>
	);
};
