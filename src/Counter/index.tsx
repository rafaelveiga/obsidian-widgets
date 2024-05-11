import React, { useEffect, useState } from "react";
import { HelperFunctions } from "src/types/HelperFunctions";

const Counter = ({ settings, helperFunctions }: CounterProps) => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		helperFunctions.readFromDataJson().then((data: DataJson) => {
			const { path } = helperFunctions.getCurrentOpenFile();

			setCount(data[path]);
		});
	}, []);

	const increment = () => {
		const currentCount = count;

		setCount(currentCount + 1);

		const { path } = helperFunctions.getCurrentOpenFile();

		helperFunctions.writeToDataJson({
			[path]: currentCount + 1,
		});
	};

	const decrement = () => {
		const currentCount = count;

		setCount(currentCount - 1);

		const { path } = helperFunctions.getCurrentOpenFile();

		helperFunctions.writeToDataJson({
			[path]: currentCount - 1,
		});
	};

	const reset = () => {
		setCount(0);

		const { path } = helperFunctions.getCurrentOpenFile();

		helperFunctions.writeToDataJson({
			[path]: 0,
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
	type: "counter";
	text: string;
}

interface CounterProps {
	settings: CounterSettings;
	helperFunctions: HelperFunctions;
}

interface DataJson {
	[path: string]: number;
}

export default Counter;
