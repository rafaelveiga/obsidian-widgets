import React, { useEffect, useState } from "react";
import { moment } from "obsidian";

const Countdown = ({ settings: { date, to } }: CountdownProps) => {
	const [days, setDays] = useState("");
	const [hours, setHours] = useState("");
	const [minutes, setMinutes] = useState("");
	const [seconds, setSeconds] = useState("");
	const [invalidDate, setInvalidDate] = useState<string | null>(null);

	useEffect(() => {
		const endTime = moment(`${date}`);

		if (!endTime.isValid()) {
			setInvalidDate("Invalid Date");
			return;
		}
		const clockInterval = setInterval(() => {
			const currentTime = moment();

			const duration = moment.duration(endTime.diff(currentTime));

			if (currentTime.isAfter(endTime, "second")) {
				setInvalidDate("Completed! 🎉");
				return;
			}

			setDays(duration.days().toFixed(0));
			setHours(duration.hours().toFixed(0));
			setMinutes(duration.minutes().toFixed(0));
			setSeconds(duration.seconds().toFixed(0));
		}, 1000);

		() => {
			clearInterval(clockInterval);
		};
	}, []);

	if (invalidDate) {
		return (
			<>
				<div className="Countdown_Container">
					<div className="Countdown_Item">
						<h3>{invalidDate}</h3>
					</div>
				</div>
				<div className="Countdown_To">{to}</div>
			</>
		);
	}

	return (
		<>
			<div className="Countdown_Container">
				<div className="Countdown_Item">
					<h3>{days}</h3>
					<small>days</small>
				</div>
				<div className="Countdown_Item">
					<h3>{hours}</h3>
					<small>hours</small>
				</div>
				<div className="Countdown_Item">
					<h3>{minutes}</h3>
					<small>minutes</small>
				</div>
				<div className="Countdown_Item">
					<h3>{seconds}</h3>
					<small>seconds</small>
				</div>
			</div>
			<div className="Countdown_To">{to}</div>
		</>
	);
};

export default Countdown;

export interface CountdownProps {
	settings: {
		type: "countdown";
		date: string;
		to: string;
	};
}
