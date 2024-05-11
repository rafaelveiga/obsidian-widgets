import React, { useState } from "react";
import { HelperFunctions } from "src/types/HelperFunctions";

const Counter = ({ settings, helperFunctions }: CounterProps) => {
	const [count, setCount] = useState(0);

	const increment = () => {
		setCount(count + 1);
		helperFunctions.writeToDataJson({
			count: count,
		});
	};

	const decrement = () => {
		setCount(count - 1);
	};

	return (
		<div>
			<button onClick={increment}>+</button>
			<button onClick={decrement}>-</button>
			{count}
		</div>
	);
};

export interface CounterSettings {
	type: "counter";
}

interface CounterProps {
	settings: CounterSettings;
	helperFunctions: HelperFunctions;
}

export default Counter;
