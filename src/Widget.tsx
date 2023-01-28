import * as React from "react";

export const Widget = ({ type: string }) => {
	const [count, setCount] = React.useState(0);

	return (
		<h4>
			{count}! <button onClick={() => setCount(count + 1)} />
		</h4>
	);
};
