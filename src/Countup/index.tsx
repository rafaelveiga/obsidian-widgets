import React, { useEffect, useState } from "react";
import { moment } from "obsidian";
import { WidgetType } from "src/types/Widgets";
import { Moment } from "moment";

const Countup = ({ settings: { date, from } }: CountupProps) => {
	const [Countup, setCountup] = useState<CountupConfig>({
		years: 0,
		months: 0,
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});
	const [invalidDate, setInvalidDate] = useState<string | null>(null);

	useEffect(() => {
		// Check if date is in the format +[number][s/m/h]
		const dateRegex = /^(\+)(\d+)([smh])$/;
		const dateMatch = date.match(dateRegex);
		let startTime: Moment;

		if (dateMatch) {
			const [, , value, unit] = dateMatch;

			const currentTime = moment();
			startTime = currentTime.clone();

			switch (unit) {
				case "s":
					startTime.add(parseInt(value), "seconds");
					break;
				case "m":
					startTime.add(parseInt(value), "minutes");
					break;
				case "h":
					startTime.add(parseInt(value), "hours");
					break;
			}
		} else {
			startTime = moment(`${date}`);
		}

		if (!startTime.isValid()) {
			setInvalidDate("Invalid Date");
			return;
		}

		const clockInterval = setInterval(() => {
			const currentTime = moment();
			const diffInSeconds = currentTime.diff(startTime, "seconds");
			const sTime = startTime.clone();
			if (diffInSeconds < 0) {
				setInvalidDate("Enter Past Date Time");
				return;
			}
			
			const years = currentTime.diff(sTime, 'year');
			sTime.add(years, 'years');
			
			const months = currentTime.diff(sTime, 'months');
			sTime.add(months, 'months');
			
			const days = currentTime.diff(sTime, 'days');
			sTime.add(days, 'days');
			
			const hours = currentTime.diff(sTime, 'hours');
			sTime.add(hours, 'hours');
			
			const minutes = currentTime.diff(sTime, 'minutes');
			sTime.add(minutes, 'minutes');

			const seconds = currentTime.diff(sTime, 'seconds');
			
			setCountup({ years, months, days, hours, minutes, seconds});
		}, 1000);

		return () => {
			clearInterval(clockInterval);
		};
	}, [date]);

	if (invalidDate) {
		return (
			<>
				<div className="Countup_Container">
					<div className="Countup_Item">
						<h3>{invalidDate}</h3>
					</div>
				</div>
				<div className="Countup_From">{from}</div>
			</>
		);
	}

	return (
		<>
			<div className="Countup_Container">
				<div className="Countup_Item">
					<h3>{Countup.years}</h3>
					<small>years</small>
				</div>
				<div className="Countup_Item">
					<h3>{Countup.months}</h3>
					<small>months</small>
				</div>
				<div className="Countup_Item">
					<h3>{Countup.days}</h3>
					<small>days</small>
				</div>
				<div className="Countup_Item">
					<h3>{Countup.hours}</h3>
					<small>hours</small>
				</div>
				<div className="Countup_Item">
					<h3>{Countup.minutes}</h3>
					<small>minutes</small>
				</div>
				<div className="Countup_Item">
					<h3>{Countup.seconds}</h3>
					<small>seconds</small>
				</div>
			</div>
			<div className="Countup_From">{from}</div>
		</>
	);
};

export default Countup;

export interface CountupSettings {
	type: WidgetType;
	date: string;
	from: string;
}

interface CountupProps {
	settings: CountupSettings;
}

interface CountupConfig {
	years: number;
	months: number;
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}
