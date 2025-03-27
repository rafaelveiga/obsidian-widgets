import React, { useEffect, useState } from "react";
import { moment } from "obsidian";
import { WidgetType } from "src/types/Widgets";
import { Moment } from "moment";

const Countdown = ({
	settings: { date, to, completedLabel, show },
}: CountdownProps) => {
	const [countdown, setCountdown] = useState<CountdownState>({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});
	const [invalidDate, setInvalidDate] = useState<string | null>(null);

	const showItems = show?.split(",").map((item) => item.trim()) || [];
	const showState: CountdownShowState = {
		days: show ? showItems.includes("days") : true,
		hours: show ? showItems.includes("hours") : true,
		minutes: show ? showItems.includes("minutes") : true,
		seconds: show ? showItems.includes("seconds") : true,
	};

	useEffect(() => {
		// Check if date is in the format +[number][s/m/h/d]
		const dateRegex = /^(\+)(\d+)([smhd])$/;
		const dateMatch = date.match(dateRegex);
		let endTime: Moment;

		if (dateMatch) {
			const [, , value, unit] = dateMatch;

			const currentTime = moment();
			endTime = currentTime.clone();

			switch (unit) {
				case "s":
					endTime.add(parseInt(value), "seconds");
					break;
				case "m":
					endTime.add(parseInt(value), "minutes");
					break;
				case "h":
					endTime.add(parseInt(value), "hours");
					break;
				case "d":
					endTime.add(parseInt(value), "days");
					break;
			}
		} else {
			endTime = moment(`${date}`);
		}

		if (!endTime.isValid()) {
			setInvalidDate("Invalid Date");
			return;
		}

		const clockInterval = setInterval(() => {
			const currentTime = moment();
			const diffInSeconds = endTime.diff(currentTime, "seconds");

			if (diffInSeconds < 0) {
				setInvalidDate(completedLabel || "Completed! 🎉");
				return;
			}

			const days = Math.floor(diffInSeconds / 86400);
			const hours = Math.floor((diffInSeconds % 86400) / 3600);
			const minutes = Math.floor((diffInSeconds % 3600) / 60);
			const seconds = Math.floor(diffInSeconds % 60);

			setCountdown({ days, hours, minutes, seconds });
		}, 1000);

		return () => {
			clearInterval(clockInterval);
		};
	}, [date]);

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
				{showState.days && (
					<div className="Countdown_Item">
						<h3>{countdown.days}</h3>
						<small>days</small>
					</div>
				)}
				{showState.hours && (
					<div className="Countdown_Item">
						<h3>{countdown.hours}</h3>
						<small>hours</small>
					</div>
				)}
				{showState.minutes && (
					<div className="Countdown_Item">
						<h3>{countdown.minutes}</h3>
						<small>minutes</small>
					</div>
				)}
				{showState.seconds && (
					<div className="Countdown_Item">
						<h3>{countdown.seconds}</h3>
						<small>seconds</small>
					</div>
				)}
			</div>
			<div className="Countdown_To">{to}</div>
		</>
	);
};

export default Countdown;

export interface CountdownSettings {
	type: WidgetType;
	date: string;
	to: string;
	completedLabel: string;
	show?: string;
}

interface CountdownProps {
	settings: CountdownSettings;
}

interface CountdownState {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

interface CountdownShowState {
	days: boolean;
	hours: boolean;
	minutes: boolean;
	seconds: boolean;
}
