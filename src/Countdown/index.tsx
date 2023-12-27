import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

const Countdown = ({ settings: { date, to } }: CountdownProps) => {
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		dayjs.extend(duration);
		const endTime = dayjs(`${date}`);
		const clockInterval = setInterval(() => {
			const currentTime = dayjs();

			const daysDiff = endTime.diff(currentTime, "days");
			const hoursDiff = currentTime.diff(
				currentTime.endOf("day"),
				"hours"
			);
			const minutesDiff = currentTime.diff(
				currentTime.endOf("hour"),
				"minutes"
			);
			const secondsDiff = currentTime.diff(
				currentTime.endOf("minute"),
				"seconds"
			);

			setDays(daysDiff);
			setHours(-hoursDiff);
			setMinutes(-minutesDiff);
			setSeconds(-secondsDiff);
		}, 100);

		() => {
			clearInterval(clockInterval);
		};
	}, []);

	return (
		<>
			<CountdownContainer>
				<CountdownItem>
					<h3>{days}</h3>
					<small>days</small>
				</CountdownItem>
				<CountdownItem>
					<h3>{hours}</h3>
					<small>hours</small>
				</CountdownItem>
				<CountdownItem>
					<h3>{minutes}</h3>
					<small>minutes</small>
				</CountdownItem>
				<CountdownItem>
					<h3>{seconds}</h3>
					<small>seconds</small>
				</CountdownItem>
			</CountdownContainer>
			<To>{to}</To>
		</>
	);
};

const CountdownContainer = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 10px;
`;

const CountdownItem = styled.div`
	text-align: center;
	border: 1px solid var(--color-accent-1);
	border-radius: 10px;
	padding: 20px 0;
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 12px;

	h3 {
		font-size: 50px;
		line-height: 50px;
		margin: 0px;
	}

	small {
		color: var(--text-muted);
	}
`;

const To = styled.div`
	text-align: center;
	margin-top: 12px;
	color: var(--text-muted);
`;

export default Countdown;

interface CountdownProps {
	settings: {
		date: string;
		to: string;
	};
}
