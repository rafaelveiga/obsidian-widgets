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
		  const diffInSeconds = endTime.diff(currentTime, "seconds");
	  
		  if (diffInSeconds < 0) {
			setInvalidDate("Completed! 🎉");
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
				<div className="Countdown_Item">
					<h3>{countdown.days}</h3>
					<small>days</small>
				</div>
				<div className="Countdown_Item">
					<h3>{countdown.hours}</h3>
					<small>hours</small>
				</div>
				<div className="Countdown_Item">
					<h3>{countdown.minutes}</h3>
					<small>minutes</small>
				</div>
				<div className="Countdown_Item">
					<h3>{countdown.seconds}</h3>
					<small>seconds</small>
				</div>
			</div>
			<div className="Countdown_To">{to}</div>
		</>
	);

	export default Countdown;

	export interface CountdownProps {
		settings: {
			type: "countdown";
			date: string;
			to: string;
		};
		countdown: {
			days: number;
			hours: number;
			minutes: number;
			seconds: number;
		};
	}