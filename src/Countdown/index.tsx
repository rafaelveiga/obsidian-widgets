import React, { useEffect, useState } from "react";
import { moment } from "obsidian";
import { WidgetType } from "src/types/Widgets";
import { Moment } from "moment";

const Countdown = ({
	settings: { date, to, completedLabel, show, excludeWeekends, excludedDates },
}: CountdownProps) => {
	const [countdown, setCountdown] = useState<CountdownState>({
		years: 0,
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});
	const [invalidDate, setInvalidDate] = useState<string | null>(null);

	const showItems = show?.split(",").map((item) => item.trim()) || [];
	const showState: CountdownShowState = {
		years: show ? showItems.includes("years") : true,
		days: show ? showItems.includes("days") : true,
		hours: show ? showItems.includes("hours") : true,
		minutes: show ? showItems.includes("minutes") : true,
		seconds: show ? showItems.includes("seconds") : true,
	};

	const isExcludedDate = (date: Moment): boolean => {
		// Check if it's a weekend and weekends are excluded
		if (excludeWeekends === "true" && (date.day() === 0 || date.day() === 6)) {
			return true;
		}

		// Check if it's in the excluded dates list
		if (excludedDates) {
			const excludedDatesList = excludedDates.split(",").map(date => date.trim());
			return excludedDatesList.some(excludedDate => {
				// Check if it's a date range (YYYY-MM-DD:YYYY-MM-DD)
				if (excludedDate.includes(":")) {
					const [startDate, endDate] = excludedDate.split(":").map(d => d.trim());
					const startMoment = moment(startDate);
					const endMoment = moment(endDate);
					return date.isSameOrAfter(startMoment, 'day') && date.isSameOrBefore(endMoment, 'day');
				}
				// Single date
				const excludedMoment = moment(excludedDate);
				return date.isSame(excludedMoment, 'day');
			});
		}

		return false;
	};

	const calculateWorkingDays = (start: Moment, end: Moment): number => {
		let workingDays = 0;
		let current = start.clone();

		while (current.isBefore(end, 'day')) {
			if (!isExcludedDate(current)) {
				workingDays++;
			}
			current.add(1, 'day');
		}

		return workingDays;
	};

	useEffect(() => {
		// Check if date is in the format +[number][s/m/h/d/y]
		const dateRegex = /^(\+)(\d+)([smhdy])$/;
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
				case "y":
					endTime.add(parseInt(value), "years");
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

			// Calculate working days if excludeWeekends or excludedDates is set
			let days = Math.floor((diffInSeconds % 31536000) / 86400);
			if (excludeWeekends === "true" || excludedDates) {
				days = calculateWorkingDays(currentTime, endTime);
			}

			const years = Math.floor(diffInSeconds / 31536000);
			const hours = Math.floor((diffInSeconds % 86400) / 3600);
			const minutes = Math.floor((diffInSeconds % 3600) / 60);
			const seconds = Math.floor(diffInSeconds % 60);

			setCountdown({ years, days, hours, minutes, seconds });
		}, 1000);

		return () => {
			clearInterval(clockInterval);
		};
	}, [date, excludeWeekends, excludedDates]);

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
				{showState.years && (
					<div className="Countdown_Item">
						<h3>{countdown.years}</h3>
						<small>years</small>
					</div>
				)}
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
	excludeWeekends?: string;
	excludedDates?: string;
}

interface CountdownProps {
	settings: CountdownSettings;
}

interface CountdownState {
	years: number;
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

interface CountdownShowState {
	years: boolean;
	days: boolean;
	hours: boolean;
	minutes: boolean;
	seconds: boolean;
}
