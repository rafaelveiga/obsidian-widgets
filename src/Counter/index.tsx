import React, { useEffect, useState } from "react";
import { HelperFunctions } from "src/types/HelperFunctions";
import { WidgetType } from "src/types/WidgetTypes";

const Counter = ({ settings, helperFunctions, leafId }: CounterProps) => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		helperFunctions.readFromDataJson().then((data: DataJson) => {
			let path: string;

			if (leafId) {
				path = leafId;
			} else {
				const { path: filePath } = helperFunctions.getCurrentOpenFile();
				path = filePath;
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

		setCount(currentCount + 1);

		writeToDataJson(currentCount + 1);
	};

	const decrement = () => {
		const currentCount = count;

		setCount(currentCount - 1);

		writeToDataJson(currentCount - 1);
	};

	const reset = () => {
		setCount(0);

		writeToDataJson(0);
	};

	const writeToDataJson = (value: number) => {
		helperFunctions.readFromDataJson().then((data: DataJson) => {
			let path: string;

			if (leafId) {
				path = leafId;
			} else {
				const { path: filePath } = helperFunctions.getCurrentOpenFile();
				path = filePath;
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
}

interface CounterProps {
	settings: CounterSettings;
	helperFunctions: HelperFunctions;
	leafId: string;
}

export interface DataJson {
	[path: string]: number;
}

export default Counter;
