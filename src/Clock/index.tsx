import * as React from "react";
import dayjs from "dayjs";
import styled from "styled-components";

const Clock = ({ settings: { borderColor } }) => {
	const [time, setTime] = React.useState(dayjs().format("HH:mm:ss"));

	React.useEffect(() => {
		const clockInterval = setInterval(() => {
			setTime(dayjs().format("HH:mm:ss"));
		}, 1000);

		() => {
			clearInterval(clockInterval);
		};
	}, []);

	return (
		<ClockFace>
			<Divider borderColor={borderColor} />
			{time}
			<Divider borderColor={borderColor} />
		</ClockFace>
	);
};

const ClockFace = styled.div`
	font-size: 40px;
	text-align: center;
`;

const Divider = styled.div`
	height: 1px;
	width: 100%;
	background: ${(props) => props.borderColor};
`;

export default Clock;
