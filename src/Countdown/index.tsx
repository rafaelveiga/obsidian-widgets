import React, { useEffect, useState } from "react";
import { moment } from "obsidian";

const Countdown = ({ settings: { date, to } }: CountdownProps) => {
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [invalidDate, setInvalidDate] = useState<string | null>(null);

	useEffect(() => {
		const endTime = moment(`${date}`);

		if (moment().isAfter(endTime, "minute")) {
			setInvalidDate("Completed! 🎉");
			return;
		}

		if (!endTime.isValid()) {
			setInvalidDate("Invalid Date");
			return;
		}
		const clockInterval = setInterval(() => {
			const currentTime = moment();
			const endOfCurrentDay = moment().endOf("day");
			const endOfCurrentHour = moment().endOf("hour");
			const endOfCurrentMinute = moment().endOf("minute");

			const daysDiff = endTime.diff(currentTime, "days");
			const hoursDiff = currentTime.diff(endOfCurrentDay, "hours");
			const minutesDiff = currentTime.diff(endOfCurrentHour, "minutes");
			const secondsDiff = currentTime.diff(endOfCurrentMinute, "seconds");

			setDays(daysDiff);
			setHours(-hoursDiff);
			setMinutes(-minutesDiff);
			setSeconds(-secondsDiff);
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
