import * as React from "react";
import { moment } from "obsidian";
import styled from "styled-components";

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
		<ClockFace>
			<Divider />
			{time}

			<Date>{date}</Date>
			<Divider />
		</ClockFace>
	);
};

const ClockFace = styled.div`
	font-size: 60px;
	line-height: 60px;
	text-align: center;
`;

const Divider = styled.div`
	height: 1px;
	width: 100%;
	margin: 20px 0;
	background: var(--color-accent-1);
`;

const Date = styled.div`
	font-size: 20px;
	line-height: 20px;
	color: var(--text-muted);
`;

export default Clock;
