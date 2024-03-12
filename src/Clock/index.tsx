import * as React from "react";
import { moment } from "obsidian";

const Clock = () => {
	const [time, setTime] = React.useState(moment().format("HH:mm:ss"));
	const [date, setDate] = React.useState(
		moment().format("dddd, MMMM DD, YYYY")
	);

	React.useEffect(() => {
		const clockInterval = setInterval(() => {
			setTime(moment().format("HH:mm:ss"));
			setDate(moment().format("dddd, MMMM DD, YYYY"));
		}, 100);

		() => {
			clearInterval(clockInterval);
		};
	}, []);

	return (
		<div className="Clock_Face">
			<div className="Clock_Divider" />
			{time}

			<div className="Clock_Date">{date}</div>
			<div className="Clock_Divider" />
		</div>
	);
};

export default Clock;

export interface ClockSettings {
	type: "clock";
}
