import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Icon from "./Icon";

const ICON_BY_WEATHER_CODE = {
	20: "11d",
	21: "11d",
	40: "09d",
	42: "09d",
};
const Weather = ({ settings: { lat, lon, unit, basePath, configDir } }) => {
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=${
				unit === "F" ? "fahrenheit" : "celsius"
			}`
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);

				setWeather(data);
			});
	}, []);

	return (
		<WeatherContainer>
			{weather && (
				<>
					<Icon />
					<h3>
						{weather?.current_weather?.temperature}°{unit}
					</h3>
				</>
			)}
		</WeatherContainer>
	);
};

const WeatherContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	h3 {
		font-size: 34px;
	}
`;

export default Weather;
