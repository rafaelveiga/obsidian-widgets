import React, { useEffect, useState } from "react";
import { DataJson, HelperFunctions } from "src/types/HelperFunctions";
import { WidgetType } from "src/types/Widgets";

const Counter = ({ settings, helperFunctions, leafId }: CounterProps) => {
	const [count, setCount] = useState(parseInt(settings.startValue || "0"));

	useEffect(() => {
		helperFunctions.readFromDataJson().then((data: DataJson) => {
			let path: string;

			if (leafId.length > 0) {
				path = leafId + (settings.id ? `-${settings.id}` : "");
			} else {
				const { path: filePath } = helperFunctions.getCurrentOpenFile();
				path = filePath + (settings.id ? `-${settings.id}` : "");
			}

			if (!data[path]) {
				writeToDataJson(0);
				setCount(0);

				return;
			}

			setCount(data[path]);
		});
	}, []);

	const increment = () => {
		const currentCount = count;

		const increment = parseInt(settings.increment || "1");
		setCount(currentCount + increment);

		writeToDataJson(currentCount + increment);
	};

	const decrement = () => {
		const currentCount = count;

		const decrement = parseInt(settings.increment || "1");
		setCount(currentCount - decrement);

		writeToDataJson(currentCount - decrement);
	};

	const reset = () => {
		const startValue = parseInt(settings.startValue || "0");
		setCount(startValue);

		writeToDataJson(startValue);
	};

	const writeToDataJson = (value: number) => {
		helperFunctions.readFromDataJson().then((data: DataJson) => {
			let path: string;

			if (leafId.length > 0) {
				path = leafId + (settings.id ? `-${settings.id}` : "");
			} else {
				const { path: filePath } = helperFunctions.getCurrentOpenFile();
				path = filePath + (settings.id ? `-${settings.id}` : "");
			}

			helperFunctions.writeToDataJson({
				...data,
				[path]: value,
			});
		});
	};

	return (
		<div className="Counter__container">
			<div className="Counter__counter">
				<button onClick={decrement}>-</button>
				{count}
				<button onClick={increment}>+</button>
				<button onClick={reset}>Reset</button>
			</div>
			<div className="Counter__text">{settings.text}</div>
		</div>
	);
};

export interface CounterSettings {
	type: WidgetType;
	text: string;
	id: string;
	increment: string;
	startValue: string;
}

interface CounterProps {
	settings: CounterSettings;
	helperFunctions: HelperFunctions;
	leafId: string;
}

Counter.defaultProps = {
	settings: {
		text: "Count",
		id: "",
		increment: "1",
		startValue: "0",
	},
};

export default Counter;
